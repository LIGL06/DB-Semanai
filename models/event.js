var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var mongoUrl = 'mongodb://localhost/semanai'
var connection = mongoose.createConnection(mongoUrl)
autoIncrement.initialize(connection);


var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , "Coloca un email válido "];

var place_schema = new Schema({
  seq: {type: Number, default: 0},
  nombreLugar: String,
  subnombreLugar: String,
  caterogiaLugar: String,
  descLugar: String,
  historiaLugar: String,
  tipicoLugar: String,
  bgLugar: String,
  videoLugar: String,
  latitudLugar: String,
  longitudLugar: String,
  fotos: [{}],
  videos: [{}],
  estrellasLugar: {type: Number, min:[1,"Debe ser mayor a 1"],max:[5,"Debe ser menor a 5"]}
})

var user_schema = new Schema({
  firstName: String,
  lastName: String,
username: {
  type: String,
  maxlength: [50, "Usuario muy grande"]
  },
email: {
  type: String,
  required: "El correo es obligatorio",
  match: email_match
  },
})

var comment_schema = new Schema({
  idLugar: {type: String,ref:'Place'},
  idUser: String,
  picUser: String,
  comment: String,
  rate: {type:Number, min:[1,"Debe ser mayor a 1"],max:[5,"Debe ser menor a 5"]}
})

var cat_schema = new Schema({

})

var foto_schema = new Schema({
  idFoto: Number,
  idLugar:{type:String, ref:'Place'}
})

var qr_chema = new Schema({

})

place_schema.plugin(autoIncrement.plugin,'Place');

var Comments = mongoose.model('Comment', comment_schema);
var User = mongoose.model('User',user_schema);
var Place = mongoose.model('Place', place_schema);
module.exports.Place = Place;
module.exports.User = User;
