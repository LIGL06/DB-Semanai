var express = require('express');
var stormpath = require('express-stormpath');
var mongoose = require('mongoose');
var multer = require('multer');
var qrcode = require('node-qrcode');
var storage = multer.diskStorage({destination: 'public/uploads/',filename: function(req,file,cb){
  cb(null, Date.now()+'.jpg')
}});
var upload = multer({storage:storage})
var Place = require('../models/event').Place;
var router = express.Router();

/* GET home page. */
router.get('/',stormpath.loginRequired,function(req, res, next) {
  res.render('dashboard', { title: 'Panel de Administración' });
});

router.get('/events',stormpath.loginRequired,function(req, res, next) {
  Place.find(function(err,doc){
    if (err) {
      res.send('Error')
    }
    res.render('events',{places:doc, title: 'Panel de puntos de interes'})
  })
});

router.get('/events/:id',function(req, res, next){
  Place.findOne({_id:req.params.id}, function(err,doc){
    if (err) {
      res.send(err)
    }
    res.send(doc)
  })
})

router.get('/qr/:id',function(req, res, next){
  Place.findOne({_id:req.params.id}, function(err,doc){
    qrcode({
      text: doc.descLugar,
      size: 200,
      qrcodepath: 'public/qr/qrcode.png',
      browser: 'chrome'
    }).then(function(qrcodepath){
      console.log(qrcodepath)
    })
    res.redirect('/dashboard/events')
  })
})


router.get('/new',stormpath.loginRequired,function(req, res, next) {
  res.render('new', { title: 'Panel de nuevo punto de interes' });
});

router.post('/new',stormpath.loginRequired,upload.single('fotoLugar'),function(req, res, next){
  var place = new Place({
    idLugar: req.body.idLugar,
    nombreLugar: req.body.nombreLugar,
    subnombreLugar: req.body.subnombreLugar,
    descLugar: req.body.descLugar,
    historiaLugar: req.body.historiaLugar,
    latitudLugar: req.body.latitudLugar,
    longitudLugar: req.body.longitudLugar,
  })
  if (req.files) {
    fotoLugar: req.file.path
  }else {
    fotoLugar: 'sample.png'
  }
  place.save().then(function(){
    res.send('¡Éxito!')
  }, function(error){
    if (error) {
      res.send('¡Error!')
    }
  })
})

router.get('/edit/:id',stormpath.loginRequired,function(req,res,next){
  Place.findOne({_id:req.params.id}, function(err,place){
    if (err) {
      res.send(err)
    }else {
      res.render('edit', {place:place, title: 'Editar lugar de interes'})
    }
  })
})

router.get('/edit/#{id}',stormpath.loginRequired,function(req, res, next) {
  res.render('dashboard', { title: 'Panel de Administración' });
});
module.exports = router;
