var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
var methodOverride = require('method-override')
var qr = require('qr-image');
var storage = multer.diskStorage({destination: 'public/uploads/',filename: function(req,file,cb){
  cb(null, Date.now()+'.jpg')
}});
var upload = multer({storage:storage})
var Place = require('../models/event').Place;
var Comment = require('../models/event').Comment;
var Qr = require('../models/event').Qr;
var router = express.Router();

/* GET home page. */
router.get('/sitios',function(req, res, next) {
  Place.find(function(err,docs){
    if (docs) {
      res.setHeader('Access-Control-Allow-Origin','http://localhost:8100')
      res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,UPDATE')
      res.setHeader('Access-Control-Allow-Headers','X-Requested-with,content-type')
      res.setHeader('Access-Control-Allow-Cerenditials',false)
      res.send(docs)
    }else {
      res.send('No data')
    }
  })
});

router.get('/sitios/:id',function(req, res, next){
  Place.findOne({_id:req.params.id}, function(err,doc){
    if (err) {
      res.send(err)
    }else {
      res.setHeader('Access-Control-Allow-Origin','http://localhost:8100')
      res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,UPDATE')
      res.setHeader('Access-Control-Allow-Headers','X-Requested-with,content-type')
      res.setHeader('Access-Control-Allow-Cerenditials',false)
      res.send(doc)
    }
  })
})


router.get('/sitios/comments/:id', function(req, res,next){
  Comment.find({idLugar:req.params.id},function(err,doc){
    if (err) {
      res.send(err)
    }else {
      res.setHeader('Access-Control-Allow-Origin','http://localhost:8100')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,UPDATE')
    res.setHeader('Access-Control-Allow-Headers','X-Requested-with,content-type')
    res.setHeader('Access-Control-Allow-Cerenditials',false)
    res.send(doc)
    }
  })
})

router.get('/qr/:id',function(req, res, next){
  Qr.findOne({_id:req.params.id},function(err,doc){
    if (err) {
      res.send(err)
    }else {
      res.setHeader('Access-Control-Allow-Origin','http://localhost:8100')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,UPDATE')
    res.setHeader('Access-Control-Allow-Headers','X-Requested-with,content-type')
    res.setHeader('Access-Control-Allow-Cerenditials',false)
    res.send(doc)
    }
  })
})

router.get('/imagenes/:id',function(req, res, next){
  Place.findOne({_id:req.params.id},function(err,doc){
    if (err) {
      res.send(err)
    }else {
      var arary = [doc.bgLugar,doc.fotos]
      res.setHeader('Access-Control-Allow-Origin','http://localhost:8100')
      res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,UPDATE')
      res.setHeader('Access-Control-Allow-Headers','X-Requested-with,content-type')
      res.setHeader('Access-Control-Allow-Cerenditials',false)
      res.send(arary)
    }
  })
})

router.post('/new/comment', function(req,res,next){
  var comment = new Comment({
    idLugar: req.params.idLugar,
    idUser: req.params.idUser,
    picUser: req.params.picUser,
    comment: req.params.comment,
    rate: req.params.rate,
    username: req.params.username,
    date: req.params.date
  })
  comment.save()
  Comment.find({idLugar:comment.idLugar},function(err,doc){
    var suma;
    for (var i = 0; i < doc.length; i++) {
      suma = suma + doc[i].rate;
    }
    suma = suma/doc.length;
    var data = new Place({
      estrellasLugar: suma
    })
    Place.findOneAndUpdate({_id:comment.idLugar},data,function(err,resultado){
      if (err) {
        console.log(err);
      }else {
        console.log(resultado)
      }
    })
    console.log(req)
  })
  res.setHeader('Access-Control-Allow-Origin','http://localhost:8100')
  res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,UPDATE')
  res.setHeader('Access-Control-Allow-Headers','X-Requested-with,content-type')
  res.setHeader('Access-Control-Allow-Cerenditials',false)
})


module.exports = router;
