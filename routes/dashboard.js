var express = require('express');
var stormpath = require('express-stormpath');
var cloudinary = require('cloudinary');
var mongoose = require('mongoose');
var multer = require('multer');
var methodOverride = require('method-override');
var qr = require('qr-image');
var storage = multer.diskStorage({destination: 'public/uploads/',filename: function(req,file,cb){
  cb(null, Date.now()+'.jpg')
}});
cloudinary.config({
  cloud_name: 'hammock-software',
  api_key: '836918743132241',
  api_secret: '0QwMCzJc_eW-IIuRAzkTHDoetwc'
})
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
    var Buffer = 'Descripcion: '+doc.descLugar+' Historia: '+doc.historiaLugar
    if (err) {
      res.redirect('/dashboard/events')
    }else {
      var code = qr.image(Buffer,{type: 'svg'})
      res.type('svg')
      code.pipe(res)
    }
  })
})

router.get('/new',stormpath.loginRequired,function(req, res, next) {
  res.render('new', { title: 'Panel de nuevo punto de interes' });
});

router.post('/new',upload.array('fotoLugar',12),function(req, res, next){
  var place = new Place({
    idLugar: req.body.idLugar,
    nombreLugar: req.body.nombreLugar,
    subnombreLugar: req.body.subnombreLugar,
    descLugar: req.body.descLugar,
    historiaLugar: req.body.historiaLugar,
    latitudLugar: req.body.latitudLugar,
    longitudLugar: req.body.longitudLugar,
  })
  // place.save().then(function(){
  //   res.redirect('/dashboard/events')
  // }, function(error){
  //   if (error) {
  //     res.send('¡Error!')
  //   }
  // })
  if (req.files) {
    cloudinary.uploader.upload(req.files[0].path,function(result){
      place.bgLugar = result.url;
    })
    cloudinary.uploader.upload(req.files[1].path,function(result){
      place.fotos[0] = result.url;
    })
    cloudinary.uploader.upload(req.files[2].path,function(result){
      place.fotos[1] = result.url;
    })
    res.send(place)
  }else {
    res.redirect('/dashboard/new')
  }
})

router.get('/image',stormpath.loginRequired,function(req, res, next){
  res.render('images',{title: 'Panel de Imagenes'})
})

router.get('/image/new',stormpath.loginRequired,function(req, res, next){
  res.render('newimage',{title: 'Panel de Imagenes'})
})

router.get('/edit/:id',stormpath.loginRequired,function(req, res, next){
  Place.findOne({_id:req.params.id}, function(err,place){
    if (err) {
      res.send(err)
    }else {
      res.render('edit', {place:place, title: 'Eliminar lugar de interes'})
    }
  })
})

router.get('/delete/:id',stormpath.loginRequired,function(req, res, next){
  Place.findOne({_id:req.params.id}, function(err,place){
    if (err) {
      res.send(err)
    }else {
      res.render('delete', {place:place, title: 'Editar lugar de interes'})
    }
  })
})

router.delete('/delete/:id',stormpath.loginRequired,function(req, res, next){
  Place.findOneAndRemove({"_id":req.params.id}, function(err){
    if (err) {
      res.send(err)
    }else {
      res.redirect('/dashboard/events')
    }
  })
})

router.get('/edit/#{id}',stormpath.loginRequired,function(req, res, next) {
  res.render('dashboard', { title: 'Panel de Administración' });
});
module.exports = router;
