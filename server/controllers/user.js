//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:

//IMPORTS DE LA APP:
const User = require('../models/User');



const getMe = async( req, res ) => {
    //Obtenemos el use_id de req.user:
    const { user_id } = req.user;
    //console.log(user_id)
    const response = await User.findById(user_id);

    if (!response) {
        res.status(404).send({ msg: 'Usuario no encontrado'});
    }else {
        res.status(200).send(response);
    }
    
};

const getUsers = async( req, res ) => {
    const { active } = req.query; 
    let response = null;

    if ( active === undefined ) {
        // === undefined queremos todos los users:
        response = await User.find();

    } else {
        // === true queremos solo los users activos:
        response = await User.find( { active } );

    } 
    //console.log(response)
    res.status(200).send(response);
}

const createUser = async( req, res ) => {
   
    console.log(req.body);
    
    res.status(200).send({ msg: 'Ok!!!'})
}

module.exports = {
    getMe,
    getUsers,
    createUser
};