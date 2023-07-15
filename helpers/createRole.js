const createRole = (interaction) => {
  const roleName = interaction.fields.getTextInputValue("roleName") + "_";
  const newRole = interaction.guild.roles
    .create({
      name: roleName,
      mentionable: true,
    })
    .then(
      interaction.reply({content: `Created role \`@${roleName}\``, ephemeral: true})
    );
};

module.exports = {
  createRole,
};
