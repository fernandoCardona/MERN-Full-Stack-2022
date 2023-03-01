//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const bcrypt = require('bcryptjs');

//IMPORTS DE LA APP:
const User = require('../models/User');
const image = require('../utils/image');



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
    //Obtenemos la contraseña:
    const { password } = req.body;
    const user = new User( {...req.body, active: false});
    
    //Cifrar contraseña:
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
        //console.log(password);
        //console.log(hashPassword)
    user.password = hashPassword; 

    //Condicional de si llega imagen de avatar:
    if ( req.files.avatar ) {
        const imagePath = image.getFilePath(req.files.avatar);
        user.avatar = imagePath;
    }
    console.log(user)
    
    //Guardamos usuario nuevo en la base de datos:
    user.save(( error, userStorage ) => {
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo usuario' });
        }else {
            res.status(201).send({
                msg: 'Usuario creado correctamente',
                userStorage
            })
        }
    });
}

const updateUser = async( req, res ) => {
    const {id} = req.params;
    const userData = req.body;
    
    //Controlamos el password:

    //Controlamos imagen de avatar:

    User.findByIdAndUpdate({_id: id}, userData, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el usuario' });
        }else {
            res.status(400).send({ msg: 'Actualizacion el usuario con exito' });
        }
    });
}

module.exports = {
    getMe,
    getUsers,
    createUser,
    updateUser
};