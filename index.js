require('dotenv').config()

const express = require('express');
const hbs = require('express-hbs');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const { verifyPassword } = require('./utils/verify_password');
const { logger } = require('./config/logger');
const LocalStrategy = require('passport-local').Strategy;
const multer = require('multer');
const path = require('path');

const app = express();

// register view engine handlebars
hbs.registerHelper('isEqual', function (value1, value2, options) {
    return value1 === value2 ? options.fn(this) : options.inverse(this)
});

app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials',
    defaultLayout: __dirname + '/views/layouts/default.hbs',
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + "/views");

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, 'image-' + Date.now() + path.extname(file.originalname));
    }
});
exports.upload = multer({ storage: storage });

// register body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set up session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Use connect-flash middleware
app.use(flash());

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// register database
const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
});

// register models
exports.models = require('./models')(db);

db.sync({ force: false, logging: false }).then(() => {
    console.log("Database is connected and synced");
}
).catch((err) => {
    console.log(err);
});

// Passport local strategy for authentication
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    (username, password, done) => {
        this.models.User.findOne({ where: { email: username } }).then((user) => {
            if (!user) {
                return done(null, false, { message: 'Incorrect username or password' });
            }
            if (!verifyPassword(password, user.password)) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, user);
        }
        ).catch((err) => {
            logger.error(err);
            return done(err);
        });
    }
));

// Serialize user to store in the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser((id, done) => {
    this.models.User.findByPk(id).then((user) => {
        done(null, user);
    }).catch((err) => {
        logger.error(err);
        done(err);
    });
});

exports.passport = passport;

// register logger
require('./config')(app);

// register routes
app.get('/', (req, res) => {
    res.render('index.hbs', { title: "Blog Application" });
});
require('./routes')(app);

// start server
const server_port = process.env.APP_PORT || 8080;
app.listen(server_port, () => {
    console.log(`Server is running on port ${server_port}`);
});