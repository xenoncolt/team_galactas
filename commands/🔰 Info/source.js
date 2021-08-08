const {
  MessageEmbed
} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "source",
  category: "🔰 Info",
  aliases: ["sourcecode"],
  cooldown: 2,
  usage: "sourcecode",
  description: "Shows you the Github and Source Code Information about this Bot",
  run: async (client, message, args, user, text, prefix) => {
    message.channel.send(new MessageEmbed()
      .setTitle(`This Bot is made by \`Xavier Colt#1919\` and **this** is the Source Code link to this Bot`)
      .setURL("https://github.com/xenoncolt")
      .addField("Discord.js: ", "[\`v12.5.1\`](https://discord.js.org)", true)
      .addField("Erela.js: ", "[\`v2.3.2\`](https://solaris.codes/projects/erelajs/)", true)
      .addField("Node.js: ", "[\`v15.3.4\`](https://nodejs.org/en/)", true)
      .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
    );
  }
};

