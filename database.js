const { MongoClient, ServerApiVersion } = require("mongodb");
const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_CLUSTER,
  DB_DATABASE_NAME,
} = require("./config.json");

const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}/?retryWrites=true&w=majority`;

class Database {
  dbClient;
  remindersCollection;
  originModule;

  constructor(originModule = "N/A") {
    this.dbClient = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    this.originModule = originModule;
    this.remindersCollection = this.dbClient
      .db(`${DB_DATABASE_NAME}`)
      .collection("reminders");
    this.birthdaysCollection = this.dbClient
      .db(`${DB_DATABASE_NAME}`)
      .collection("birthdays");
    this.configCollection = this.dbClient
      .db(`${DB_DATABASE_NAME}`)
      .collection("config");
  }

  async connect(silent = false) {
    try {
      await this.dbClient.connect();
      !silent
        ? console.log(`[${this.originModule}] - Connected to MongoDB!`)
        : null;
      return this.dbClient;
    } catch (error) {
      console.error(
        `[${this.originModule}] - Error connecting to MongoDB:`,
        error
      );
    }
  }

  async disconnect(silent = false) {
    try {
      await this.dbClient.close();
      !silent
        ? console.log(`[${this.originModule}] - Disconnected from MongoDB!`)
        : null;
    } catch (error) {
      console.error(
        `[${this.originModule}] - Error disconnecting from MongoDB:`,
        error
      );
    }
  }

  get remindersCollection() {
    return this.remindersCollection;
  }
}
module.exports = {
  Database,
};
