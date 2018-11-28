const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt-nodejs');

//esquema de usuarios
const userSchema = new Schema({
    userName:{type:String, unique:true, required:true},
    password: {type:String, required:true},
    rol: {type:String, enum:['admin','abogado','cliente']},
});

//encriptar contraseñas
userSchema.methods.encryptPassword = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
};

module.exports = mongoose.model('users',userSchema);