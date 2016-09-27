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
var router = express.Router();

/* GET home page. */
router.get('/',function(req, res, next) {
  Place.find(function(err,docs){
    res.setHeader('Access-Control-Allow-Origin','http://localhost:8888/')
    res.setHeader('Access-Control-Allow-Origin','http://localhost:8100/')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,UPDATE')
    res.setHeader('Access-Control-Allow-Headers','X-Requested-with,content-type')
    res.setHeader('Access-Control-Allow-Cerenditials',false)
    res.send(docs)
  })
});

module.exports = router;
