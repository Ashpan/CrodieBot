const { getRoleIdToDelete } = require("../../events/selectMenuHandler");

const addRole = async (interaction) => {
  const selectedRoleId = getRoleIdToDelete(interaction.member.id);
  const roleToAdd = interaction.guild.roles.cache.get(selectedRoleId);
  if (!roleToAdd) {
    return await interaction.reply({
      content: "That role does not exist.",
      ephemeral: true,
    });
  }
  if (interaction.member.roles.cache.has(selectedRoleId)) {
    return await interaction.reply({
      content: "You already have that role.",
      ephemeral: true,
    });
  }
  try {
    await interaction.member.roles.add(selectedRoleId);
    await interaction.reply({
      content: `You have been added to the ${roleToAdd.name} role.`,
      ephemeral: true,
    });
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
};

module.exports = {
  addRole,
};
