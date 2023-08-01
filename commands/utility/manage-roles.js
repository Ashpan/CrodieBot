const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const { hasPermission } = require("../../helpers/generic/permissions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("manage-roles")
    .setDescription("lets admins manage roles."),
  async execute(interaction) {
    if (!hasPermission(interaction.member, PermissionFlagsBits.Administrator)) {
      return await interaction.reply({
        content: "You must be the server owner to use this command.",
        ephemeral: true,
      });
    }
    const createRoles = new ButtonBuilder()
      .setCustomId("create-roles")
      .setLabel("Create Roles")
      .setStyle(ButtonStyle.Primary);
    const deleteRoles = new ButtonBuilder()
      .setCustomId("delete-roles")
      .setLabel("Delete Roles")
      .setStyle(ButtonStyle.Primary);
    const row = new ActionRowBuilder().addComponents([
      createRoles,
      deleteRoles,
    ]);
    await interaction.reply({
      components: [row],
      ephemeral: true,
    });
  },
};
