const { roleAssign } = require("../helpers/voice/roleAssign.js");

const handleVoiceState = async (oldState, newState) => {
  if (oldState.channel !== newState.channel) {
    return roleAssign(oldState, newState);
  }
};

module.exports = {
  handleVoiceState,
};
