//IMPORTAR DEPENDENCIAS Y MODULOS:
const bcrypt = require('bcryptjs');
const User = require('../models/User');

function register( req,res ) {
    
    console.log(req.body);
    const { firstname, lastname, email, password } = req.body;

    if (!firstname) res.status(400).send({ msg: 'firstname is required' });
    if (!lastname) res.status(400).send({ msg: 'lastname is required' });
    if (!email) res.status(400).send({ msg: 'email is required' });
    if (!password) res.status(400).send({ msg: 'password is required' });

    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        password,
        role: 'user',
        active: false,
        
    });
    
    //Cifrar contraseña:
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
        //console.log(password);
        //console.log(hashPassword)
    user.password = hashPassword;

    user.save(( error, userStorage ) => {
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo usuario' });
        }else {
            res.status(200).send({
                msg: 'Error al crear el nuevo usuario',
                userStorage
            })
        }
    })
    console.log(user)
    console.log('Se ha ejecutado el registro');
}


module.exports = {
    register
}