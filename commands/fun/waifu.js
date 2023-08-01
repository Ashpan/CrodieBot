const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("waifu")
    .setDescription("Replies with Waifu!"),
  async execute(interaction) {
    fetch("https://api.waifu.pics/sfw/bonk")
      .then((response) => {
        return response.json();
      })
      .then(async (url) => {
        await interaction.reply(url["url"]);
        await interaction.followUp("go to horny jail!");
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
