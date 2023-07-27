const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Purges specified amount of messages.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of messages to purge")
        .setRequired(true)
    ),

  async execute(interaction) {
    // You must have the manage messages permission to use this command
    if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
      return interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }
    interaction.channel.bulkDelete(interaction.options.getInteger("amount"));
    interaction.reply({
      content: `Purged ${interaction.options.getInteger("amount")} messages.`,
      ephemeral: true,
    });
  },
};
