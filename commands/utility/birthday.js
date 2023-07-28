const { SlashCommandBuilder } = require("discord.js");
const { createBirthday } = require("../../helpers/birthday/createBirthday.js");
const { listBirthday } = require("../../helpers/birthday/listBirthday.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("birthday")
    .setDescription("Set a reminder for a birthday")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Add your own birthday")
        .addStringOption((option) =>
          option
            .setName("birthday")
            .setDescription("Enter your birthday")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("set")
        .setDescription("Set another user's birthday")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("Enter the users name")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("birthday")
            .setDescription("Enter their birthday")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("list").setDescription("list all birthdays")
    ),
  async execute(interaction) {
    const subCommand = interaction.options.getSubcommand();
    if (subCommand === "add") {
      const user = interaction.member;
      return await createBirthday(interaction, user);
    } else if (subCommand === "set") {
      //if (
      //  !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
      //) {
      //  return await interaction.reply({
      //    content:
      //      "You must have administrative privileges to use this command.",
      //    ephemeral: true,
      //  });
      //}
      const user = interaction.options.getUser("user");
      return await createBirthday(interaction, user);
    } else if (subCommand === "list") {
      return await listBirthday(interaction);
    }
  },
};
