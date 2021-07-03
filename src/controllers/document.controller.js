const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { documentService } = require('../services');
const { disallow } = require('joi');

const createDocument = catchAsync(async (req, res) => {
  // Verify if the user has uploaded a document 
  const file = req.file;
  if(file){
    const documentBody = {
      ...req.body,
      path: file.path
    }
    const user = await documentService.createDocument(req.user.id,documentBody);
    res.status(httpStatus.CREATED).send(user);
  }
  else{
    res.status(httpStatus.BAD_REQUEST).send("Please attach a file");
  }
});

const getDocuments = catchAsync(async (req, res) => {
  const id = req.params.userId ? req.params.userId : req.user.id;
  const result = await documentService.queryDocuments(id);
  res.send(result);
});

const getDocument = catchAsync(async (req, res) => {
  const id = req.params.userId ? req.params.userId : req.user.id;
  const document = await documentService.getDocumentByID(id, req.params.documentID);
  if (!document) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }
  res.send(document);
});

const updateDocument = catchAsync(async (req, res) => {
  const id = req.params.userId ? req.params.userId : req.user.id;
  const user = await documentService.updateDocumentByID(id, req.params.documentID, req.body);
  res.send(user);
});

const deleteDocument = catchAsync(async (req, res) => {
  const id = req.params.userId ? req.params.userId : req.user.id;
  await documentService.deleteDocumentByID(id, req.params.documentID);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDocument,
  getDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
};
