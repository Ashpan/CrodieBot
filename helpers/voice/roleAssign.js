const getRoleId = async (newState, roleName) => {
  //check if the role exists, get its id
  if (newState.guild.roles.cache.some((role) => role.name === roleName)) {
    foundRole = newState.guild.roles.cache.find(
      (role) => role.name === roleName
    );
    return foundRole.id;
  } else {
    //otherwise make a new role for the VC
    const newRole = await newState.guild.roles.create({
      name: roleName,
      mentionable: true,
    });
    return newRole.id;
  }
};

const roleAssign = async (oldState, newState) => {
  if (oldState.channel === null) {
    //Just joined, give them vc role
    roleName = newState.channel.name + " -VC";
    roleId = await getRoleId(newState, roleName);
    newState.member.roles.add(roleId);
  } else if (newState.channel === null) {
    //Just left, remove role
    roleName = oldState.channel.name + " -VC";
    roleId = await getRoleId(newState, roleName);
    newState.member.roles.remove(roleId);
  } else {
    //Moved VC, remove old role, add new role
    roleName = oldState.channel.name + " -VC";
    roleId = await getRoleId(newState, roleName);
    newState.member.roles.remove(roleId);
    roleName = newState.channel.name + " -VC";
    roleId = await getRoleId(newState, roleName);
    newState.member.roles.add(roleId);
  }
};

module.exports = {
  roleAssign,
};
