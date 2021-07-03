const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a document
 * @param {Object} documentBody
 * @param {ObjectId} userID
 * @returns {Promise<User>}
 */
const createDocument = async (userID, documentBody) => {
  const user = await User.findById(userID);
  console.log("document body : ",documentBody);
  user.documents.push(documentBody);
  user.save();
  return user;
};

/**
 * Query for documents
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDocuments = async (userID) => {
  const user = await User.findById(userID);
  console.log("user : ",user);
  const documents = user.documents;
  return documents;
};

/**
 * Get document by id
 * @param {ObjectId} id
 * @returns {Promise<Document>}
 */
const getDocumentByID = async (userID, documentID) => {
  const user = User.findById(userID);
  const document = user.documents.id(documentID);
  return document;
};
/**
 * Update document by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateDocumentByID = async (userID, documentID, updateBody) => {
  const user = await User.findById(userID);
  const document = user.documents.id(documentID);
  if (!document) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }
  Object.assign(document, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteDocumentByID = async (userID, documentID) => {
  const user = await User.findById(userID);
  const document = user.documents.id(documentID);
  if (!document) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }
  await document.remove();
  return user;
};

module.exports = {
  createDocument,
  queryDocuments,
  getDocumentByID,
  updateDocumentByID,
  deleteDocumentByID,
};
