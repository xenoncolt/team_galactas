const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const emoji = require(`../../botconfig/emojis.json`);
const ee = require("../../botconfig/embed.json");
const path = require("path")

module.exports = {
  name: path.parse(__filename).name,
  category: "🕹️ Fun",
  description: "Bot Rate Your Given Thing!",
  usage: "Rate <Text>",
  run: async (client, message, args, cmduser, text, prefix) => {
    //Start
    message.delete();
    let Content = args.join(" ");

    if (!Content)
      return message.channel.send(`Please Give Me Something To Rate!`);

    let embed = new Discord.MessageEmbed()
      .setColor(ee.color)
      .setTitle(`I Rate ${emoji.msg.rate}`)
      .setDescription(`${Math.floor(Math.random() * 11)}/10 To ${Content}`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};