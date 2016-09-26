var express = require('express');
var stormpath = require('express-stormpath');
var mongoose = require('mongoose');
var router = express.Router();
mongoose.connect('mongodb://localhost/semanai');

/* GET home page. */
router.get('/',stormpath.loginRequired,function(req, res, next) {
  res.render('dashboard', { title: 'Panel de Administración' });
});

router.get('/events',stormpath.loginRequired,function(req, res, next) {
  res.render('events', { title: 'Panel de Eventos' });
});

router.get('/new',stormpath.loginRequired,function(req, res, next) {
  res.render('new', { title: 'Panel de Nuevo Evento' });
});

router.post('/new',stormpath.loginRequired,function(req, res, next){
  res.send(req.body);
})

router.get('/edit/#{id}',stormpath.loginRequired,function(req, res, next) {
  res.render('dashboard', { title: 'Panel de Administración' });
});
module.exports = router;
