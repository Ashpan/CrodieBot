const { setBirthdayChannel } = require("./birthdayHandler.js");

let roleIdToDelete = {};
const handleSelectMenuInteraction = (interaction) => {
  if (interaction.customId === "roleNameSelectMenu") {
    const userId = interaction.member.id;
    roleIdToDelete[userId] = interaction.values[0];
    interaction.deferUpdate();
  }
  if (interaction.customId === "birthdayChanMenu") {
    setBirthdayChannel(interaction);
  }
};

const getRoleIdToDelete = (userId) => {
  return roleIdToDelete[userId];
};

module.exports = {
  handleSelectMenuInteraction,
  getRoleIdToDelete,
};
