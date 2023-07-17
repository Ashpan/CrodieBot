const { getRoleIdToDelete } = require("../events/selectMenuHandler");

const removeRole = async (interaction) => {
  const selectedRoleId = getRoleIdToDelete(interaction.member.id);
  const roleToRemove = interaction.guild.roles.cache.get(selectedRoleId);
  if (!roleToRemove) {
    return await interaction.reply({
      content: "That role does not exist.",
      ephemeral: true,
    });
  }
  await interaction.member.roles.remove(roleToRemove);
  await interaction.reply({
    content: `You have left the ${roleToRemove.name} role.`,
    ephemeral: true,
  });
};

module.exports = {
  removeRole,
};
