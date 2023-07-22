const { createRole } = require("../helpers/roles/createRole.js");
const { createReminder } = require("../helpers/reminder/createReminder.js");

const handleModalInteraction = async (interaction) => {
  if (interaction.customId == "roleCreateModal") {
    createRole(interaction);
  } else if (interaction.customId == "reminderCreateModal") {
    createReminder(interaction);
  }
};

module.exports = {
  handleModalInteraction,
};
