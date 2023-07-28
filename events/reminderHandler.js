const { MongoNotConnectedError } = require("mongodb");
const { Database } = require("../database");

let remindersCollection;
const db = new Database((originModule = "CHK REM"));
let dbClient;
const initReminderHandler = async () => {
  try {
    // Connect to the database
    dbClient = await db.connect();
    remindersCollection = db.remindersCollection;
    await db.disconnect();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

const checkReminders = async (client) => {
  try {
    // Connect to the database
    dbClient = await db.connect((silent = true));
    const currentTime = new Date();

    const reminders = await remindersCollection
      .find({ reminderTime: { $lte: currentTime } })
      .toArray();
    for (const reminder of reminders) {
      // Get the user ID from the reminder and send a reminder message
      const user = await client.users.fetch(reminder.userId);
      const channel = await client.channels.fetch(reminder.channelId);
      channel.send(
        `## Reminder 🔔\n<@${user.id}>: ${reminder.reminderMessage}`
      );

      // Remove the triggered reminder from the collection
      await remindersCollection.deleteOne({ _id: reminder._id });
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

module.exports = { initReminderHandler, checkReminders };
