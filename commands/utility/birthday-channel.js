const {
  SlashCommandBuilder,
  ChannelSelectMenuBuilder,
  ActionRowBuilder,
  ChannelType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("birthday-channel")
    .setDescription("lets admins set a channel for birthday messages."),
  async execute(interaction) {
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      return await interaction.reply({
        content: "You must be the server owner to use this command.",
        ephemeral: true,
      });
    }
    const selectMenu = new ChannelSelectMenuBuilder()
      .setCustomId("birthdayChanMenu")
      .setChannelTypes(ChannelType.GuildText);
    const row = new ActionRowBuilder().addComponents(selectMenu);
    await interaction.reply({
      content: "Select a channel for birthday messages",
      components: [row],
      ephemeral: true,
    });
  },
};
