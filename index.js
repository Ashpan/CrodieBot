// Require the necessary discord.js classes
const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  Partials,
  InteractionType,
} = require("discord.js");
const { TOKEN } = require("./config.json");
const { handleModalInteraction } = require("./events/modalHandler.js");
const { handleButtonInteraction } = require("./events/buttonHandler.js");
const {
  handleSelectMenuInteraction,
} = require("./events/selectMenuHandler.js");
const { handleVoiceState } = require("./events/voiceHandler.js");
const { Database } = require("./database");
const {
  initReminderHandler,
  checkReminders,
} = require("./events/reminderHandler.js");

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const db = new Database((originModule = "INDEX"));
const run = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    const dbClient = await db.connect();
    // Send a ping to confirm a successful connection
    await dbClient.db("new_bot_dev").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log({ error: error });
  } finally {
    // Ensures that the client will close when you finish/error
    db.disconnect();
  }
};

client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);

  initReminderHandler().then(() => {
    setInterval(() => checkReminders(client), 60000);
  });
});

client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
  return await handleVoiceState(oldState, newState);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (
    !interaction.isChatInputCommand() &&
    !interaction.isMessageContextMenuCommand() &&
    !interaction.isButton() &&
    !interaction.isModalSubmit
  )
    return;

  if (interaction.type === InteractionType.ModalSubmit) {
    return await handleModalInteraction(interaction);
  } else if (interaction.isButton()) {
    return await handleButtonInteraction(interaction);
  } else if (interaction.isStringSelectMenu()) {
    return handleSelectMenuInteraction(interaction);
  } else {
    let commandCaller = interaction.commandName;
    console.log(`Command called: ${commandCaller}`);
    const command = interaction.client.commands.get(commandCaller);

    if (!command) {
      console.error(`No command matching ${commandCaller} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  }
});

// Log in to Discord with your client's TOKEN
client.login(TOKEN);
run().catch(console.dir);
