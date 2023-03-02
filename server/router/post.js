//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const express = require('express');
const multiparty = require('connect-multiparty');
//IMPORTS DE LA APP:
const PostController = require('../controllers/post');
const md_auth = require('../middlewaares/authenticated');

const md_upload = multiparty({uploadDir: './uploads/blog'});

const api = express.Router();

//MENU ENDPOIND :
api.post('/post', [ md_auth.asureAuth, md_upload ], PostController.createPost);
api.get('/post', PostController.getPosts);
api.patch('/post/:id', [ md_auth.asureAuth,md_upload ], PostController.updatePost);
api.delete('/post/:id', [md_auth.asureAuth], PostController.deletePost);
api.get('/post/:path', PostController.getSinglePost);

module.exports = api;