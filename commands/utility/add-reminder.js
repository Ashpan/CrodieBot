const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-reminder")
    .setDescription("Set a reminder"),
  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("reminderCreateModal")
      .setTitle("Create Reminder");

    const reminderTime = new TextInputBuilder()
      .setCustomId("reminderTime")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("Enter a time")
      .setMinLength(1)
      .setMaxLength(100)
      .setLabel("Enter the time you wanted to be reminded at");

    const reminderMessage = new TextInputBuilder()
      .setCustomId("reminderMessage")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("Enter a message")
      .setMinLength(1)
      .setMaxLength(100)
      .setLabel("Enter your reminder message");

    const timeRow = new ActionRowBuilder().addComponents([reminderTime]);
    const messageRow = new ActionRowBuilder().addComponents([reminderMessage]);
    modal.addComponents(timeRow, messageRow);
    await interaction.showModal(modal);
  },
};
