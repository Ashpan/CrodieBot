const { createRole } = require("../helpers/createRole.js");

const handleModalInteraction = async (interaction) => {
  if (interaction.customId == "roleCreateModal") {
    createRole(interaction);
  }
};

module.exports = {
  handleModalInteraction,
};
