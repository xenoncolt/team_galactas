const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require("../../botconfig/config.json");
const emoji = require(`../../botconfig/emojis.json`);
const ee = require("../../botconfig/embed.json");
const playermanager = require(`../../handlers/playermanager`);
module.exports = {
  name: `addprevious`,
  category: `🎶 Music`,
  aliases: [`addp`, `addpre`, `addprevius`, `addprevios`],
  description: `Adds the previous song to the Queue again!`,
  usage: `addprevious`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": true},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      //define the type
      let type = `song:youtube`;
      //if the previous was from soundcloud, then use type soundcloud
      if (player.queue.previous.uri.includes(`soundcloud`)) type = `song:soundcloud`
      //adds/plays it
      playermanager(client, message, Array(player.queue.previous.uri), type);
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  }
};

