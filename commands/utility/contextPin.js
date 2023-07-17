const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Pin/Unpin")
    .setType(ApplicationCommandType.Message),
  async execute(interaction) {
    hasRole = interaction.member.roles.cache.some(
      (role) => role.name === "pin"
    );
    targetMessage = await interaction.channel.messages.fetch(
      interaction.targetId
    );
    if (hasRole && !targetMessage.pinned) {
      targetMessage.pin();
      pinStatus = "pinned";
    } else if (hasRole && targetMessage.pinned) {
      targetMessage.unpin();
      pinStatus = "unpinned";
    } else {
      return;
    }
    await interaction.reply({
      content: `Message has been ${pinStatus}.`,
      ephemeral: true,
    });
  },
};
