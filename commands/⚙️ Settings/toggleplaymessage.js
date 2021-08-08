const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
module.exports = {
  name: "toggleplaymessage",
  aliases: ["toggleplaymsg", "playmessage", "playmsg"],
  category: "⚙️ Settings",
  description: "Toggles playmessage (same as pruning...). If its true a message of playing a new track will be sent, even if your afk. If false it wont send any message if a new Track plays! | Default: true aka send new Track information",
  usage: "toggleplaymessage",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    //run the code of togglepruning
    let {
      run
    } = require("./togglepruning");
    run(client, message, args);
  }
};


