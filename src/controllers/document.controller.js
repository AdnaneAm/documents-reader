const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { documentService } = require('../services');

const createDocument = catchAsync(async (req, res) => {
  const user = await documentService.createDocument(req.user.id, req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getDocuments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['type', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await documentService.queryDocuments(filter, options);
  res.send(result);
});

const getDocument = catchAsync(async (req, res) => {
  const document = await documentService.getDocumentByID(req.user.id, req.params.documentID);
  if (!document) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }
  res.send(document);
});

const updateDocument = catchAsync(async (req, res) => {
  const user = await documentService.updateDocumentByID(req.user.id, req.params.documentID, req.body);
  res.send(user);
});

const deleteDocument = catchAsync(async (req, res) => {
  await documentService.deleteDocumentByID(req.user.id, req.params.docuemntID);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDocument,
  getDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
};
