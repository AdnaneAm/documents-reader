const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {uploads, handleErrors} = require('../../middlewares/upload')
const documentValidation = require('../../validations/document.validation');
const documentController = require('../../controllers/document.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('createDocument'), uploads.single('document'), handleErrors, validate(documentValidation.createDocument), documentController.createDocument)
  .get(auth('getDocuments'), validate(documentValidation.getDocuments), documentController.getDocuments);

router
  .route('/:documentID')
  .get(auth('getDocuments'), validate(documentValidation.getDocument), documentController.getDocument)
  .patch(auth('manageDocuments'), validate(documentValidation.updateDocument), documentController.updateDocument)
  .delete(auth('manageDocuments'), validate(documentValidation.deleteDocument), documentController.deleteDocument);

module.exports = router;
