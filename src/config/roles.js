const allRoles = {
  user: ['getDocuments','createDocument','manageDocuments'],
  admin: ['getDocuments', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
