/*Contiene la conexion a la base de datos */
const mongoose = require('mongoose');
const {mongodb} = require('./keys');

//abriendo la conexion
mongoose.connect(mongodb.URI,{
    useCreateIndex: true,
    useNewUrlParser:true
})
.then(db=>console.log("Coneccion Success!!!"))
.catch(err=>console.error(err));