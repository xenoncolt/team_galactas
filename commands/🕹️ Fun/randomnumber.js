const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const emoji = require(`../../botconfig/emojis.json`);
const ee = require("../../botconfig/embed.json");
const path = require("path")

module.exports = {
  name: path.parse(__filename).name,
  aliases: ["rn"],
  category: "🕹️ Fun",
  description: "Get Random Number!",
  usage: "Randomnumber",
  run: async (client, message, args, cmduser, text, prefix) => {
    //Start
    message.delete();
    let result = Math.floor(Math.random() * 101);

    const embed = new MessageEmbed()
      .setColor(ee.color)
      .setTitle(`Random Number Is ${emoji.msg.rate}`)
      .setDescription([result])
      .setFooter(`1 - 100`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};