var express = require('express');
var stormpath = require('express-stormpath');
var cloudinary = require('cloudinary');
var mongoose = require('mongoose');
var multer = require('multer');
var methodOverride = require('method-override');
var qr = require('qr-image');
var storage = multer.diskStorage({destination: 'public/uploads/',filename: function(req,file,cb){
  cb(null, (Math.random().toString(36)+'ff').slice(2, 10)+'.jpg')
}});
cloudinary.config({
  cloud_name: 'hammock-software',
  api_key: '836918743132241',
  api_secret: '0QwMCzJc_eW-IIuRAzkTHDoetwc'
})
var upload = multer({storage:storage})
var Place = require('../models/event').Place;
var Qr = require('../models/event').Qr;
var router = express.Router();

/* GET home page. */
router.get('/',stormpath.loginRequired,function(req, res, next) {
  res.render('dashboard', { title: 'Panel de Administración' });
});

router.get('/place/:id',function(req, res, next) {
  Place.findOne({_id:req.params.id}, function(err,doc){
    res.render('place', {place:doc, title: 'Objeto'})
  })
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

router.get('/qrpanel', function(req, res,next){
  Qr.find(function(err,doc){
    if (err) {
      res.send('Error')
    }
    res.render('qrpanel',{places:doc, title: 'Panel de Qr'})
  })
})

router.get('/qr/get/:id',function(req, res, next){
  Place.findOne({_id:req.params.id}, function(err,doc){
    var Buffer = 'sitio'+','+req.params.id
    if (err) {
      res.redirect('/dashboard/events')
    }else {
      var code = qr.image(Buffer,{type: 'svg'})
      res.type('svg')
      code.pipe(res)
    }
  })
})

router.get('/qr/new',function(req, res, next){
  res.render('newqr',{title:'Nuevos Qr'})
})

router.get('/qrpanel/get/:id',function(req, res, next){
  Qr.findOne({_id:req.params.id}, function(err,doc){
    var Buffer = doc.tipoQr+','+doc.idRef
    if (err) {
      res.redirect('/dashboard/events')
    }else {
      var code = qr.image(Buffer,{type: 'svg'})
      res.type('svg')
      code.pipe(res)
    }
  })
})

router.post('/qr/new',upload.single('imagen'),function(req, res, next){
  var qr = new Qr({
    tipoQr: 'info',
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen
  })
  qr.idRef = qr.id;
  qr.save().then(function(){
    res.redirect('/dashboard/qrpanel')
  })
})

router.get('/new',stormpath.loginRequired,function(req, res, next) {
  res.render('new', { title: 'Panel de nuevo punto de interes' });
});

router.post('/new',upload.array('fotoLugar',3),function(req, res, next){
  var place = new Place({
    nombreLugar: req.body.nombreLugar,
    subnombreLugar: req.body.subnombreLugar,
    descLugar: req.body.descLugar,
    historiaLugar: req.body.historiaLugar,
    latitudLugar: req.body.latitudLugar,
    longitudLugar: req.body.longitudLugar,
  })
  if (req.files) {
    place.bgLugar = req.files[0].filename;
    place.fotos[0] = req.files[1].filename;
    place.fotos[1] = req.files[2].filename;
    place.save().then(function(){
      res.redirect('/dashboard')
    }, function(err){
      if (err) {
        console.log(err)
        res.send(err)
      }
    })
    console.log(place.id)
    var qr = new Qr({
      tipoQr: 'sitio',
      nombre: place.nombreLugar,
      idRef: place.id
    })
    qr.save()
  }else{
    place.bgLugar = "default.png";
    res.redirect('/dashboard')
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
