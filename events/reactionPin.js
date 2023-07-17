const reactionPin = async (reaction, user) => {
  if (reaction.message.partial) {
    try {
      await reaction.message.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message: ", error);
    }
  }

  reaction.message.guild.members
    .fetch(user.id)
    .then((member) => member.roles.cache.some((role) => role.name === "pin"))
    .then(function (hasRole) {
      if (hasRole && reaction.emoji.name == "📌") {
        reaction.message.pin();
      }
    });
};

export default reactionPin;
