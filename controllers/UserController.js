const User = require('../models/User');
const userController = {};

//mostrar todos los usuarios
userController.index = async function(req,res,next)
{
    //extrallendo a todos los usuarios
    let users = await User.find();
    return res.status(200).json(users);
}

//buscar usuario
userController.findUser = async function(req, res, next)
{
    let {id} = req.params;
    let user = await User.findById(id);
    return res.status(200).json(user);
}
//crear usuario
userController.store = async function(req,res,next)
{
    let user = new User();
    user.userName=req.body.user;
    user.password = user.encryptPassword(req.body.password);
    user.rol = req.body.rol;
    await user.save();
    return res.status(200).json({"message":"Usuario agregado con exito"});
}

//modificar usuario
userController.update =async function(req,res,next)
{
    let {id} = req.params;
    await User.update({_id:id},req.body);
    res.status(200).json({"message":"Usuario actualizado con exito"});
}
//eliminar usuario
userController.delete = async function(req, res, next)
{
    let {id} = req.params;
    await User.remove({_id:id});
    res.status(200).json({"message":"Usuario Eliminado con exito"});
}


module.exports = userController;