const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const documentValidation = require('../../validations/document.validation');
const documentController = require('../../controllers/document.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('createDocument'), validate(documentValidation.createDocument), documentController.createDocument)
  .get(auth('getDocuments'), validate(documentValidation.getDocuments), documentController.getDocuments);

router
  .route('/:documentID')
  .get(auth('getUsers'), validate(documentValidation.getDocument), documentController.getDocument)
  .patch(auth('manageUsers'), validate(documentValidation.updateDocument), documentController.updateDocument)
  .delete(auth('manageUsers'), validate(documentValidation.deleteDocument), documentController.deleteDocument);

module.exports = router;
