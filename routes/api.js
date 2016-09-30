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
var router = express.Router();

/* GET home page. */
router.get('/',function(req, res, next) {
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

router.get('/:id',function(req, res, next){
  Place.findOne({_id:req.params.id}, function(err,doc){
    if (err) {
      res.send(err)
    }
    res.setHeader('Access-Control-Allow-Origin','http://localhost:8100')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,UPDATE')
    res.setHeader('Access-Control-Allow-Headers','X-Requested-with,content-type')
    res.setHeader('Access-Control-Allow-Cerenditials',false)
    res.send(doc)
  })
})

router.get('/name/:id',function(req, res, next){
  Place.findOne({nombreLugar:req.params.id}, function(err,doc){
    if (err) {
      res.send(err)
    }
    res.setHeader('Access-Control-Allow-Origin','http://localhost:8100')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,UPDATE')
    res.setHeader('Access-Control-Allow-Headers','X-Requested-with,content-type')
    res.setHeader('Access-Control-Allow-Cerenditials',false)
    res.send(doc)
  })
})

router.get('/place/:id/comments', function(req, res,next){
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

router.post('/new/comment', function(req,res,next){
  var Comment = new Comment({
    idLugar: req.body.idLugar,
    idUser: req.body.idUser,
    picUser: req.body.picUser,
    comment: req.body.comment,
    rate: req.body.rate
  })
  Comment.save()
})

router.get('/images',function(req, res,next){

})


module.exports = router;
