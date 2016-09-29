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
  idLugar: Number,
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
  fotos: [{type:String}],
  videos: [{type:String}],
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

var comments = new Schema({
  _creator: {type: Number, ref: 'User'},
  title: String,
})

var cat_schema = new Schema({

})

var foto_schema = new Schema({
  idFoto: Number,
  idLugar:{type:String, ref:'Place'}
})

var qr_chema = new Schema({

})

var User = mongoose.model('User',user_schema);
var Place = mongoose.model('Place', place_schema);
module.exports.Place = Place;
module.exports.User = User;
