//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const express = require('express');
//IMPORTS DE LA APP:
const MenuController = require('../controllers/menu');
const md_auth = require('../middlewaares/authenticated');


const api = express.Router();

//MENU ENDPOIND :
api.post('/menu', [md_auth.asureAuth], MenuController.createMenu);
api.get('/menu', MenuController.getMenus);
api.patch('/menu/:id', [md_auth.asureAuth,], MenuController.updateMenu);
api.delete('/menu/:id', [md_auth.asureAuth], MenuController.deleteMenu);

module.exports = api;