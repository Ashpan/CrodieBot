const {
  SlashCommandBuilder,
  ChannelSelectMenuBuilder,
  ActionRowBuilder,
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");
const { hasPermission } = require("../../helpers/generic/permissions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("birthday-channel")
    .setDescription("lets admins set a channel for birthday messages."),
  async execute(interaction) {
    if (!hasPermission(interaction.member, PermissionFlagsBits.Administrator)) {
      return await interaction.reply({
        content: "You must have administrative privileges to use this command.",
        ephemeral: true,
      });
    }
    const selectMenu = new ChannelSelectMenuBuilder()
      .setCustomId("birthdayChannelMenu")
      .setChannelTypes(ChannelType.GuildText);
    const row = new ActionRowBuilder().addComponents(selectMenu);
    await interaction.reply({
      content: "Select a channel for birthday messages",
      components: [row],
      ephemeral: true,
    });
  },
};
