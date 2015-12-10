var
  index = require('./controllers/index'),
  storage = require('./controllers/storage'),
  collection = require('./controllers/collection'),
  realtime = require('./controllers/realtime');

module.exports = {

  initRoutes: function (app) {
    app.use('/', index);
    app.use('/storage', storage);
    app.use('/collection', collection);
    app.use('/realtime', realtime);
  }

};