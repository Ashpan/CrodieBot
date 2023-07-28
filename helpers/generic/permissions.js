const hasPermission = (member, permission) => {
  return member.permissions.has(permission);
};

module.exports = {
  hasPermission,
};
