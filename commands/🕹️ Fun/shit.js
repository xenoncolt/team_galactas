const {
  MessageEmbed
} = require('discord.js');
const Discord = require(`discord.js`);
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const emoji = require(`../../botconfig/emojis.json`);
const canvacord = require("canvacord");
const path = require("path");
module.exports = {
  name: path.parse(__filename).name,
  category: "🕹️ Fun",
  useage: `${path.parse(__filename).name} [@User]`,
  description: "*Image cmd in the style:* " + path.parse(__filename).name,
  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      let tempmsg = await message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setAuthor("Loading...", "https://cdn.discordapp.com/emojis/769935094285860894.gif")
      );
      let user = message.mentions.users.first() || message.author;
      let avatar = user.displayAvatarURL({
        dynamic: false,
        format: 'png'
      });
      let image = await canvacord.Canvas.shit(avatar);
      let attachment = await new Discord.MessageAttachment(image, "shit.png");
      let fastembed2 = new Discord.MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setImage("attachment://shit.png")
        .attachFiles(attachment)
      await message.channel.send(fastembed2);
      await tempmsg.delete().catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray))
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
}

