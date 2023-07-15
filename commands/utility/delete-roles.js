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
    .setName("delete-roles")
    .setDescription("lets admins delete roles."),
  async execute(interaction) {
    // check if user is an administrator
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      return await interaction.reply({
        content: "You must be an administrator to use this command.",
        ephemeral: true,
      });
    }

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
      } );
    });

    if (roleNameMenu.options.length == 0) {
      return await interaction.reply({
        content: "There are no roles to delete.",
        ephemeral: true,
      });
    }


    const confirmButton = new ButtonBuilder()
      .setCustomId("deleteRoleConfirm")
      .setLabel("Delete Role")
      .setStyle(ButtonStyle.Danger);
    const cancelButton = new ButtonBuilder()
      .setCustomId("deleteRoleCancel")
      .setLabel("Cancel")
      .setStyle(ButtonStyle.Primary);

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
