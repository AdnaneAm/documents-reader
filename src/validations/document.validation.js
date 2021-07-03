const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createDocument = {
  body: Joi.object().keys({
    type: Joi.string().required().valid('relevé bancaire','facture','attestation de travail', 'autres'),
    language: Joi.string().required().valid('eng','fra')
  }),
};

const getDocuments = {
  query: Joi.object().keys({
    type: Joi.string().valid('relevé bancaire', 'facture', 'attestation de travail', 'autres'),
    status: Joi.string().valid('pending', 'approved', 'declined'),
    language: Joi.string().valid('eng','fra'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDocument = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    documentID: Joi.string().custom(objectId),
  }),
};

const updateDocument = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    documentID: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      type: Joi.string().valid('relevé bancaire','facture','attestation de travail', 'autres'),
      status: Joi.string().valid('approved','declined'),
      language: Joi.string().valid('eng','fra')
    })
    .min(1),
};

const deleteDocument = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    documentID: Joi.string().custom(objectId),
  }),
};
const readDocument = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    documentID: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createDocument,
  getDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
  readDocument
};
