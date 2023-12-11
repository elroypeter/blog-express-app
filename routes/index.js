module.exports = (app) => {
    require('./auth.routes')(app);
    require('./post.routes')(app);
    require('./user.routes')(app);
    require('./comment.routes')(app);
    require('./likes.routes')(app);
}