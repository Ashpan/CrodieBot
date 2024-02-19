const { Database } = require("../../database");
const chrono = require("chrono-node");

const createReminder = async (interaction) => {
  const reminderTime = interaction.fields.getTextInputValue("reminderTime");
  const reminderMessage =
    interaction.fields.getTextInputValue("reminderMessage");
  currentDate = new Date();
  const parseDate = chrono.parse(reminderTime, currentDate, {
    forwardDate: true,
  });
  if (parseDate.length === 0) {
    return await interaction.reply({
      content: "I couldn't understand the time you provided. Please try again",
      ephemeral: true,
    });
  }
  const date = parseDate[0].start.date();
  const epochTime = parseInt(date.getTime() / 1000);
  await saveReminder(
    interaction.guild.id,
    interaction.channel.id,
    interaction.user.id,
    date,
    reminderMessage
  );
  await interaction.reply({
    content: `I will remind you <t:${epochTime}:R>`,
  });
};

const saveReminder = async (
  guildId,
  channelId,
  userId,
  reminderTime,
  reminderMessage
) => {
  const reminder = {
    guildId: guildId,
    channelId: channelId,
    userId: userId,
    reminderTime: reminderTime,
    reminderMessage: reminderMessage,
  };
  const db = new Database();
  await db.remindersCollection.insertOne(reminder);
};

module.exports = { createReminder };
