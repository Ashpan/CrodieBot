const { deleteRole } = require("../helpers/roles/deleteRole.js");
const { addRole } = require("../helpers/roles/addRole.js");
const { removeRole } = require("../helpers/roles/removeRole.js");

const handleButtonInteraction = async (interaction) => {
  if (interaction.customId === "deleteRoleConfirm") {
    await deleteRole(interaction);
  } else if (interaction.customId === "deleteRoleCancel") {
    await interaction.reply("Role deletion has been canceled.");
  } else if (interaction.customId === "addRoleConfirm") {
    await addRole(interaction);
  } else if (interaction.customId === "addRoleCancel") {
    await interaction.reply("Role addition has been canceled.");
  } else if (interaction.customId === "removeRoleConfirm") {
    await removeRole(interaction);
  } else if (interaction.customId === "removeRoleCancel") {
    await interaction.reply("Role removal has been canceled.");
  } else {
    // Handle button interactions for commands when not special case
    const command = interaction.client.commands.get(interaction.customId);
    if (!command) {
      console.error(`No command matching ${interaction.customId} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "[REPLIED] There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  }
};

module.exports = {
  handleButtonInteraction,
};
