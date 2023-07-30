const { Database } = require("../../database");
const { EmbedBuilder } = require("discord.js");
const { COLOR_CODES } = require("../../helpers/constants/values.js");

const listBirthday = async (interaction) => {
  const db = new Database((originModule = "LST BIR"));
  try {
    // Connect to the database
    await db.connect();
    const birthdaysCollection = db.birthdaysCollection;

    //return birthdays of matching guild, sorted by date relative to today
    const currentDate = new Date();
    const pipeline = [
      {
        $match: {
          guildId: interaction.guild.id,
        },
      },
      {
        $addFields: {
          dateDifference: { $subtract: [currentDate, "$date"] },
        },
      },
      {
        $sort: {
          dateDifference: -1, // 1 for ascending order, -1 for descending order
        },
      },
    ];
    const birthdays = await birthdaysCollection.aggregate(pipeline).toArray();
    await db.disconnect();

    //return embed with list of birthdays
    const color = COLOR_CODES[Math.floor(Math.random() * COLOR_CODES.length)];
    const options = { month: "long", day: "numeric", year: "numeric" };
    const birthdayEmbed = new EmbedBuilder()
      .setTitle(`Birthday List`)
      .setColor(color);
    for (const birthday of birthdays) {
      const dateObject = new Date(birthday.date);
      const userAge = dateObject.getFullYear() - birthday.year;
      const epochTime = Math.floor(dateObject.getTime() / 1000);
      birthdayEmbed.addFields({
        name: `${dateObject.toLocaleString(
          undefined,
          options
        )} (${userAge} <t:${epochTime}:R>)`,
        value: `<@${birthday.userId}>`,
      });
    }
    await interaction.reply({ embeds: [birthdayEmbed] });
  } catch (error) {
    if (error instanceof MongoNotConnectedError) {
      console.log("MongoDB not connected");
    } else {
      console.error("Error checking reminders:", error);
    }
  }
};
module.exports = {
  listBirthday,
};
