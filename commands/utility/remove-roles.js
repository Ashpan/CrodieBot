const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  TextInputBuilder,
  StringSelectMenuBuilder,
  TextInputStyle,
  ComponentType,
  Events,
  ModalBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove-roles")
    .setDescription("lets users remove roles from themselves."),
  async execute(interaction) {
    const userRoles = interaction.member.roles;

    // Add components to modal
    const roleNameMenu = new StringSelectMenuBuilder()
      .setCustomId("roleNameSelectMenu")
      .setPlaceholder("Role Name")
      .setMinValues(1);
    userRoles.cache.map((role) => {
      const roleName = role.name;
      if (!roleName.endsWith("_")) return;
      roleNameMenu.addOptions({
        label: role.name,
        value: role.id,
      } );
    });

    if (roleNameMenu.options.length == 0) {
      return await interaction.reply({
        content: "There are no roles for you to leave.",
        ephemeral: true,
      });
    }


    const confirmButton = new ButtonBuilder()
      .setCustomId("removeRoleConfirm")
      .setLabel("Leave Role")
      .setStyle(ButtonStyle.Danger);
    const cancelButton = new ButtonBuilder()
      .setCustomId("removeRoleCancel")
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
