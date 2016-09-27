var express = require('express');
var stormpath = require('express-stormpath');
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
router.get('/',stormpath.loginRequired,function(req, res, next) {
  Place.find(function(err,docs){
    res.send(docs)
  })
});

module.exports = router;
