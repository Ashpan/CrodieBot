const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("waifu")
    .setDescription("Replies with Waifu!"),
  async execute(interaction) {
    fetch('https://api.waifu.pics/sfw/waifu')
        .then(response => {
            return response.json();
        })
        .then(async url => {
            await interaction.reply(url["url"]);
        })
        .catch((error) => {
            console.log(error);

        })
  },
};