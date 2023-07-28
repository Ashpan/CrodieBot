const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user-profile")
    .setDescription(
      "View profile information for a selected user, or yourself."
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to view profile information for.")
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;

    // Get profile information for the user as well as their avatar
    const currentUser = await user.fetch();
    const avatar = user.displayAvatarURL({ dynamic: true });
    const banner = currentUser.bannerURL({ dynamic: true });
    // console.log({ avatar, banner });
    console.log(currentUser);
    const profile = {
      username: user.username,
      discriminator: user.discriminator,
      id: user.id,
      avatar: avatar,
      createdAt: user.createdAt,
      banner: banner,
    };

    // display this information to the user in an embed

    await interaction.reply({
      embeds: [
        {
          title: `${user.username}'s Profile`,
          thumbnail: {
            url: avatar,
          },
          fields: [
            {
              name: "Username",
              value: profile.username,
              inline: true,
            },
            {
              name: "Discriminator",
              value: profile.discriminator,
              inline: true,
            },
            {
              name: "ID",
              value: profile.id,
              inline: true,
            },
            {
              name: "Avatar",
              value: `[Click Here](${profile.avatar})`,
              inline: true,
            },
            {
              name: "Created At",
              value: profile.createdAt,
              inline: true,
            },
            {
              name: "Banner",
              value: `[Click Here](${profile.banner})`,
              inline: true,
            },
            // {
            //   name: "Roles",
            //   value: profile.roles.join(", "),
            //   inline: true,
            // },
            // {
            //   name: "Permissions",
            //   value: profile.permissions.join(", "),
            //   inline: true,
            // },
          ],
        },
      ],
    });
  },
};
