const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("manage-roles")
    .setDescription("lets admins manage roles."),
  async execute(interaction) {
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      return await interaction.reply({ content: "You must be the server owner to use this command.", ephemeral: true });
    }
    const createRoles = new ButtonBuilder()
			.setCustomId('create-roles')
			.setLabel('Create Roles')
			.setStyle(ButtonStyle.Primary);
    const deleteRoles = new ButtonBuilder()
			.setCustomId('delete-roles')
			.setLabel('Delete Roles')
			.setStyle(ButtonStyle.Primary);
    const row = new ActionRowBuilder()
    .addComponents([createRoles, deleteRoles]);
    await interaction.reply({
      components: [row],
      ephemeral: true
    });
  },
};
