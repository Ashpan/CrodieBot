const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  TextInputBuilder,
  StringSelectMenuBuilder,
  TextInputStyle,
  ComponentType,
  Events,
  ModalBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create-roles")
    .setDescription("lets admins create roles."),
  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("roleCreateModal")
      .setTitle("Create a role");

    // Add components to modal

    const roleName = new TextInputBuilder()
      .setCustomId("roleName")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("Role Name")
      .setMinLength(1)
      .setMaxLength(100)
      .setLabel("Enter the name of the new role");
    const roleRow = new ActionRowBuilder().addComponents([roleName]);

    // Add inputs to the modal
    modal.addComponents(roleRow);

    // Show the modal to the user
    await interaction.showModal(modal);
  },
};
