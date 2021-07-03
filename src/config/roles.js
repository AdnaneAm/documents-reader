const allRoles = {
  user: ['getDocuments','createDocument','manageDocuments'],
  admin: ['getUsers', 'manageUsers', 'getUserDocuments', 'manageUserDocuments', 'getDocuments','createDocument','manageDocuments'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
