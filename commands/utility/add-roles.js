const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-roles")
    .setDescription("lets users add roles to themselves."),
  async execute(interaction) {
    const guildRoles = interaction.guild.roles;

    // Add components to modal
    const roleNameMenu = new StringSelectMenuBuilder()
      .setCustomId("roleNameSelectMenu")
      .setPlaceholder("Role Name")
      .setMinValues(1);
    guildRoles.cache.map((role) => {
      const roleName = role.name;
      if (!roleName.endsWith("_")) return;
      roleNameMenu.addOptions({
        label: role.name,
        value: role.id,
      });
    });

    if (roleNameMenu.options.length == 0) {
      return await interaction.reply({
        content: "There are no roles to join.",
        ephemeral: true,
      });
    }

    const confirmButton = new ButtonBuilder()
      .setCustomId("addRoleConfirm")
      .setLabel("Join Role")
      .setStyle(ButtonStyle.Success);
    const cancelButton = new ButtonBuilder()
      .setCustomId("addRoleCancel")
      .setLabel("Cancel")
      .setStyle(ButtonStyle.Secondary);

    const roleRow = new ActionRowBuilder().addComponents([roleNameMenu]);
    const buttonRow = new ActionRowBuilder().addComponents([
      confirmButton,
      cancelButton,
    ]);
    // Add inputs to the modal

    // Show the modal to the user
    await interaction.reply({
      components: [roleRow, buttonRow],
      ephemeral: true,
    });
  },
};
