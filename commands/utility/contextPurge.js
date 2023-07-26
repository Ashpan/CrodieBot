const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Purge")
    .setType(ApplicationCommandType.Message),
  async execute(interaction) {
    // Check if the user has the manage messages role
    if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
      return await interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }

    targetMessage = await interaction.channel.messages.fetch(
      interaction.targetId
    );

    // Purge messages from the most recent message to the target message
    if (targetMessage.createdAt < new Date(Date.now() - 1209600000)) {
      // if the message is over 14 days old, it cannot be bulk deleted
      // so we need to delete all the messages leading up to that one individually
      // this is a slow process, so we'll send a message to the user letting them know
      // that the process has started
      await interaction.reply({
        content:
          "This message is over 14 days old, so it cannot be bulk deleted. Deleting messages individually...",
        ephemeral: true,
      });
      let messages = await interaction.channel.messages.fetch({
        after: targetMessage.id,
      });
      // delete the messages individually
      for (const i = 0; i < messages.size; i++) {
        await messages[i].delete();
      }
      // delete the target message
      await targetMessage.delete();
      // send a message to the user letting them know that the process has completed
      await interaction.followUp({
        content: "Messages successfully deleted!",
        ephemeral: true,
      });
    } else {
      const messages = await interaction.channel.messages.fetch({
        after: targetMessage.id,
      });
      await interaction.channel.bulkDelete(messages);
      await targetMessage.delete();

      await interaction.reply({
        // display how many messages were purged
        content: `${messages.size} messages were purged.`,
        ephemeral: true,
      });
    }
  },
};
