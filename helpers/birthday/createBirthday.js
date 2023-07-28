const { Database } = require("../../database");
const chrono = require("chrono-node");

const createBirthday = async (interaction, user) => {
  const dateInput = interaction.options.getString("birthday");

  //parsing user inputted date
  const currentDate = new Date();
  const parseDate = chrono.parse(dateInput, currentDate, { forwardDate: true });
  if (parseDate.length === 0) {
    return await interaction.reply({
      content: "I couldn't understand the time you provided. Please try again",
      ephemeral: true,
    });
  }
  //Trimming off extra bits of input, only want month and day, re-parsing
  const parsedMonth = parseDate[0].start.get("month");
  const parsedDay = parseDate[0].start.get("day");
  const parsedYear = parseDate[0].start.get("year");
  const dateString = `${parsedMonth}/${parsedDay} 12:00AM`;
  const parseDateString = chrono.parse(dateString, currentDate, {
    forwardDate: true,
  });

  //building birthday object, sending to db
  const userId = user.id;
  const guildId = interaction.guildId;
  const date = parseDateString[0].start.date();
  const db = new Database((originModule = "CRT BIR"));
  try {
    await db.connect();
    // Find and update the birthday or create a new one if not found
    await db.birthdaysCollection.findOneAndUpdate(
      { userId: userId, guildId: guildId },
      {
        $set: {
          date: date,
          guildId: interaction.guildId,
          year: parsedYear,
        },
      },
      { upsert: true, new: true }
    );
    await db.disconnect();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return;
  }

  //Send affirmation to caller
  const unixFormat = Math.floor(date.getTime() / 1000);
  return await interaction.reply({
    content: `Set <@${userId}>'s birthday as <t:${unixFormat}>`,
    ephemeral: true,
  });
};
module.exports = {
  createBirthday,
};
