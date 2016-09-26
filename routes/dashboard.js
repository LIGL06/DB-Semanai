var express = require('express');
var stormpath = require('express-stormpath');
var mongoose = require('mongoose');
var multer = require('multer');
var storage = multer.diskStorage({destination: 'uploads/',filename: function(req,file,cb){
  cb(null, file.originalname + '-' + Date.now()+'.jpg')
}});
var upload = multer({storage:storage})
var Place = require('../models/event').Place;
var router = express.Router();

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

router.post('/new',stormpath.loginRequired,upload.single('fotoLugar'),function(req, res, next){
  var place = new Place({
    idLugar: req.body.idLugar,
    nombreLugar: req.body.nombreLugar,
    subnombreLugar: req.body.subnombreLugar,
    descLugar: req.body.descLugar,
    historiaLugar: req.body.historiaLugar,
    coordenadasLugar: req.body.coordenadasLugar,
    fotoLugar: req.file.path
  })
  res.send(place);
})

router.get('/edit/#{id}',stormpath.loginRequired,function(req, res, next) {
  res.render('dashboard', { title: 'Panel de Administración' });
});
module.exports = router;
