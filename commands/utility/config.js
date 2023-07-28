const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("config")
    .setDescription("Allows admins to configure server settings."),
  async execute(interaction) {
    const roles = new ButtonBuilder()
      .setCustomId("manage-roles")
      .setLabel("Manage Roles")
      .setStyle(ButtonStyle.Primary);
    const birthdayChannel = new ButtonBuilder()
      .setCustomId("birthday-channel")
      .setLabel("Birthday Channel")
      .setStyle(ButtonStyle.Primary);
    const row = new ActionRowBuilder().addComponents(roles, birthdayChannel);
    await interaction.reply({ components: [row], ephemeral: true });
  },
};
