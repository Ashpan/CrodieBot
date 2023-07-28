const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { COLOR_CODES } = require("../../helpers/constants/values.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const d = new Date();
    const timeTaken = interaction.createdTimestamp - d.getTime();
    const color = COLOR_CODES[Math.floor(Math.random() * COLOR_CODES.length)];
    const pingEmbed = new EmbedBuilder()
      .setColor(color)
      .setTitle("Pong!")
      .setDescription(`Took ${timeTaken}ms.`)
      .setThumbnail(
        "https://thumbs.gfycat.com/UntimelyDearDromedary-max-1mb.gif"
      );
    await interaction.reply({ embeds: [pingEmbed] });
  },
};
