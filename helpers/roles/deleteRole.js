const { getRoleIdToDelete } = require("../../events/selectMenuHandler");

const deleteRole = async (interaction) => {
  const selectedRoleId = getRoleIdToDelete(interaction.member.id);
  const roleToDelete = interaction.guild.roles.cache.get(selectedRoleId);
  if (roleToDelete) {
    try {
      await roleToDelete.delete();
      await interaction.reply({
        content: "Role has been deleted.",
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply("An error occurred while deleting the role.");
    }
  } else {
    await interaction.reply("Invalid role selection.");
  }
};

module.exports = {
  deleteRole,
};
