//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const bcrypt = require('bcryptjs');
//IMPORTS DE LA APP:
const User = require('../models/User');
const jwt = require('../utils/jwt');

const register = ( req, res ) => {
    
    //console.log(req.body);
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
                msg: 'Usuario creado correctamente',
                userStorage
            })
        }
    });
    //console.log(user)
    //console.log('Se ha ejecutado el registro');
}


const login = ( req, res ) => {
    //Obtenemos el email y la contraseña del req.body
    const{ email, password } = req.body;
    
    //Comprobamos si recibimos email y password:
    if (!email) res.status(400).send({ msg: 'El email es obligatorio' });
    if (!password) res.status(400).send({ msg: 'El password es obligatorio' });

    //Pasamos email a minusculas:
    const emailLowerCase = email.toLowerCase();

    //Buscamos si existe ese usuario:
    User.findOne({email: emailLowerCase}, (error, userStored) => {
        if (error) {
            res.status(500).send({ msg: 'Error del servidor' });
        }else {
            //console.log('Password:', password)
            //console.log(userStored)
            bcrypt.compare( password, userStored.password, ( bcryptError, check ) => {
                if (bcryptError) {
                    //servidor 002 no existe el usuario
                    res.status(500).send({ msg: 'Error del servidor 002' });
                }else if (!check) {
                    //servidor 003: Contraseña incorrecta
                    res.status(400).send({ msg: 'Error del servidor 003' });
                }else if (!userStored.active) {
                    //servidor 004: Usuario no activo
                    res.status(401).send({ msg: 'Error del servidor 004' });
                }else {
                    res.status(200).send({
                        msg: 'login 0k!!',
                        access: jwt.createAccessToken(userStored),
                        refresh: jwt.createRefreshToken(userStored)
                    });
                }
            });
        }
    })
}

const refreshAccessToken = ( req, res ) => {
    //Obtenemos el token del req.body
    const{ token } = req.body;
    if (!token) {
        res.status(400).send({ msg: 'Token Requerido' });
    }
    //Obtenemos el user_id decodificandolo del jwt:
    const { user_id } = jwt.decoded( token );
    User.findOne({ _id: user_id }, ( error, userStored)  => {
        if (error) {
            res.status(500).send({ msg: 'Error del servidor 005' });
        }else {
            res.status(200).send({
                access: jwt.createAccessToken(userStored),
            });
        }
    });
}
    


module.exports = {
    register,
    login,
    refreshAccessToken
}