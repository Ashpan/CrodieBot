const handleReactionAdd = async (reaction, user) => {
    if (reaction.message.partial) {
      //catching partials that don't have the message in cache
      try {
        await reaction.message.fetch();
      } catch (error) {
        console.error('Something went wrong when fetching the message: ', error);
      }
    }

    reaction.message.guild.members.fetch(user.id)
      .then(member =>
        member.roles.cache.some(role => role.name === "pin")
      )
      .then(function (hasRole) {
        if (hasRole && reaction.emoji.name == '📌') {
          reaction.message.pin();
        }
      });
  };

  const handleReactionRemove = async (reaction, user) => {
    if (reaction.message.partial) {
      //catching partials that don't have the message in cache
      try {
        await reaction.message.fetch();
      } catch (error) {
        console.error('Something went wrong when fetching the message: ', error);
      }
    }
    // Check if the message has no reactions for 📌, if so, unpin it
    if (reaction.emoji.name == '📌' && reaction.message.reactions.cache.size == 0) {
      reaction.message.unpin();
    }
  };

  module.exports = {
    handleReactionAdd,
    handleReactionRemove
  };