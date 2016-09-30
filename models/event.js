var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoUrl = 'mongodb://localhost/semanai'
mongoose.connect(mongoUrl, function(error){
  if (error) {
    throw error;
  }
  console.log('Conexión a BD...')
})
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , "Coloca un email válido "];

var place_schema = new Schema({
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
  tipoQr: String,
  idRef: String,
  nombre: String,
  descripcion: String,
  imagen: String
})

var Comments = mongoose.model('Comment', comment_schema);
var User = mongoose.model('User',user_schema);
var Place = mongoose.model('Place', place_schema);
var Qr = mongoose.model('Qr', qr_chema);
module.exports.Place = Place;
module.exports.User = User;
module.exports.Qr = Qr;
