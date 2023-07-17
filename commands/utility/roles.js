const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roles")
    .setDescription("lets users join and leave roles."),
  async execute(interaction) {
    const addRoles = new ButtonBuilder()
      .setCustomId("add-roles")
      .setLabel("Join Roles")
      .setStyle(ButtonStyle.Primary);
    const removeRoles = new ButtonBuilder()
      .setCustomId("remove-roles")
      .setLabel("Leave Roles")
      .setStyle(ButtonStyle.Primary);
    const row = new ActionRowBuilder().addComponents([addRoles, removeRoles]);
    await interaction.reply({
      components: [row],
      ephemeral: true,
    });
  },
};
