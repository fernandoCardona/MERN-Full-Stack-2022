//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const express = require('express');

//IMPORTS DE LA APP:
const NewsletterController = require('../controllers/newsletter');
const md_auth = require('../middlewaares/authenticated');

const api = express.Router();

//MENU ENDPOIND :
api.post('/newsletter', NewsletterController.suscribeEmail);
api.get('/newsletter', [md_auth.asureAuth], NewsletterController.getEmails);
api.delete('/newsletter/:id', [md_auth.asureAuth], NewsletterController.deleteEmail);

module.exports = api;