//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:

//IMPORTS DE LA APP:
const Newsletter = require('../models/Newsletter');


const suscribeEmail = async( req, res ) => {
    const { email } = req.body;

    if (!email) res.status(400).send({ msg: "Email obligatorio" });

    const newsletter = new Newsletter({
        email: email.toLowerCase(),
    });

    newsletter.save((error) => {
        if (error) {
            res.status(400).send({ msg: "El emial ya esta registrado" });
        } else {
            res.status(200).send({ msg: "Email registrado" });
        }
    });
};

const getEmails = async( req, res ) => {
    const { page = 1, limit = 15 } = req.query;
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    await Newsletter.paginate({}, options, (error, emailsStored) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al obtener los Emails' });
        } else{
            res.status(200).send(emailsStored);
        }
    });

    
}
const updateEmail = async( req, res ) => {
    const { id } = req.params;
    const postData = req.body;

    Post.findByIdAndUpdate( {_id: id }, postData, (error) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el Email' });
        }else {
            res.status(200).send({ msg: 'Actualizacion del Email con exito' });
        }
    });
}

const deleteEmail = async( req, res ) => {
    const { id } = req.params;
    Newsletter.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el Email' });
        }else {
            res.status(200).send({ msg: 'Email borrado con exito' });
        }
        
    });

}


module.exports = {
    suscribeEmail,
    getEmails,
    deleteEmail
};