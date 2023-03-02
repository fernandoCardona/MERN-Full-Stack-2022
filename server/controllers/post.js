//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:

//IMPORTS DE LA APP:
const Post = require('../models/Post');
const image = require('../utils/image');

const createPost = async( req, res ) => {
    const post = new Post(req.body);
    post.created_at = new Date();

    //Condicional de si llega imagen de miniature:
    if ( req.files.miniature ) {
        const imagePath = image.getFilePath(req.files.miniature);
        post.miniature = imagePath;
    }
    //console.log(post)
    
    //Guardamos usuario nuevo en la base de datos:
    post.save(( error, postStorage ) => {
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo post' });
            //console.log(error);
        }else {
            res.status(201).send({
                msg: 'Post creado correctamente',
                postStorage
            })
        }
    });
};

const getPosts = async( req, res ) => {
    const { page = 1, limit = 10 } = req.query;
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { created_at: "desc" },
    };

    await Post.paginate({}, options, (error, postsStorage) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al obtener los Posts' });
        } else{
            res.status(200).send(postsStorage);
        }
    });

    
}

const updatePost = async( req, res ) => {
    const { id } = req.params;
    const postData = req.body;

    //Condicional de si llega imagen de miniature:
    if (req.files.miniature) {
        const imagePath = image.getFilePath(req.files.miniature);
        postData.miniature = imagePath;
    }

    Post.findByIdAndUpdate( {_id: id }, postData, (error) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el Post' });
        }else {
            res.status(200).send({ msg: 'Actualizacion del Post con exito' });
        }
    });
}

const deletePost = async( req, res ) => {
    const { id } = req.params;
    Post.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el Post' });
        }else {
            res.status(200).send({ msg: 'Post borrado con exito' });
        }
        
    });

}

const getSinglePost = async( req, res ) => {
    const { path } = req.params;
    Post.findOne({path}, (error, postStored) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el Post' });
        }else if (!postStored){
            res.status(200).send({ msg: 'Postno encontrado' });
        }else {
            res.status(200).send(postStored);
        }
        
    });

}

module.exports = {
    createPost,
    getPosts,
    updatePost, 
    deletePost,
    getSinglePost
};