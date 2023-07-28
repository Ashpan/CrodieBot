const { MongoNotConnectedError } = require("mongodb");
const { Database } = require("../database");
const { EmbedBuilder } = require("discord.js");
const { BIRTHDAY_GIFS } = require("../helpers/constants/values.js");
var cron = require("node-cron");

const db = new Database((originModule = "BIR HDLR"));

const setBirthdayChannel = async (interaction) => {
  const guild = interaction.guild.id;
  const birthdayChannel = interaction.values[0];
  try {
    // Connect to the database
    await db.connect();
    configCollection = db.configCollection;
    //set or replace the channel for this guild
    await db.configCollection.findOneAndUpdate(
      { guild },
      {
        $set: {
          guild: guild,
          birthdayChannelId: birthdayChannel,
        },
      },
      { upsert: true, new: true }
    );
    await db.disconnect();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return;
  }
  return interaction.reply({
    content: `Birthday channel set to <#${birthdayChannel}>`,
    ephemeral: true,
  });
};

const getBirthdayChannel = async (guildId) => {
  try {
    // Connect to the database
    await db.connect();
    configCollection = db.configCollection;
    //find the entry for this guild
    const config = await collection.findOne({ guild: guildId });
    await db.disconnect();

    if (config) {
      return config.birthdayChannelId;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

const initBirthdayHandler = async () => {
  try {
    // Connect to the database
    dbClient = await db.connect();
    birthdaysCollection = db.birthdaysCollection;
    await db.disconnect();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return;
  }
  // Schedule a check for every night at midnight
  cron.schedule(
    "0 0 * * *",
    () => {
      console.log("Running birthday check");
      checkBirthdays(client);
    },
    {
      scheduled: true,
      timezone: "America/Toronto",
    }
  );
};

const checkBirthdays = async (client) => {
  try {
    // Connect to the database
    dbClient = await db.connect((silent = true));
    configCollection = db.configCollection;

    const currentTime = new Date();
    const birthdays = await birthdaysCollection
      .find({ date: { $lte: currentTime } })
      .toArray();
    for (const birthday of birthdays) {
      // Get the user ID from the birthday and send a birthday message
      const user = await client.users.fetch(birthday.userId);
      const config = await configCollection.findOne({
        guild: birthday.guildId,
      });

      if (config.birthdayChannelId) {
        channel = await client.channels.fetch(config.birthdayChannelId);
      } else {
        return;
      }

      // Select a random gif to place in the embed
      const randomGif =
        BIRTHDAY_GIFS[Math.floor(Math.random() * BIRTHDAY_GIFS.length)];

      const birthdayEmbed = new EmbedBuilder()
        .setTitle(`Happy Birthday!`)
        .setDescription(`${user}`)
        .setImage(randomGif);
      await channel.send({ embeds: [birthdayEmbed] });

      // Set the new date for next year
      oldDate = new Date(birthday.date);
      oldDate.setFullYear(oldDate.getFullYear() + 1);
      newDate = new Date(oldDate.toISOString());
      // Update the birthday in the database
      await birthdaysCollection.updateOne(
        { _id: birthday._id },
        { $set: { date: newDate } }
      );
    }
    await db.disconnect((silent = true));
  } catch (error) {
    if (error instanceof MongoNotConnectedError) {
      console.log("MongoDB not connected");
    } else {
      console.error("Error checking reminders:", error);
    }
  }
};

module.exports = {
  initBirthdayHandler,
  checkBirthdays,
  setBirthdayChannel,
  getBirthdayChannel,
};
