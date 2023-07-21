const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { Database } = require("../../database");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list-reminders")
    .setDescription("List all your saved reminders."),
  async execute(interaction) {
    const userId = interaction.user.id;

    try {
      const db = new Database((originModule = "LS-REM"));
      await db.connect();
      const userReminders = await db.remindersCollection
        .find({ userId })
        .toArray();
      if (userReminders.length === 0) {
        return interaction.reply("You have no saved reminders.");
      }
      const reminderList = userReminders.map(
        (reminder) =>
          `\`${reminder._id}\` - Reminder: ${
            reminder.reminderMessage
          }\nTime: <t:${parseInt(reminder.reminderTime.getTime() / 1000)}:R>`
      );
      await db.disconnect();

      const embed = new EmbedBuilder()
        .setTitle("Your Saved Reminders")
        .setDescription(reminderList.join("\n"))
        .setColor("#00ff00");

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Error fetching reminders:", error);
      interaction.reply("An error occurred while fetching reminders.");
    }
  },
};
