const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const d = new Date();
    let timeTaken = interaction.createdTimestamp - d.getTime();
    let color = interaction.member.displayHexColor;
    const pingEmbed = new EmbedBuilder()
      .setColor(color)
      .setTitle('Pong!')
      .setDescription(`Took ${timeTaken}ms.`)
      .setThumbnail('https://thumbs.gfycat.com/UntimelyDearDromedary-max-1mb.gif')
    await interaction.reply({ embeds: [pingEmbed] });
  },
};
