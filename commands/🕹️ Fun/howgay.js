const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const emoji = require(`../../botconfig/emojis.json`);
const ee = require("../../botconfig/embed.json");
const path = require("path")

module.exports = {
  name: path.parse(__filename).name,
  category: "🕹️ Fun",
  description: "Show How Gay Member Is!",
  usage: "Howgay <Mention Member>",
  run: async (client, message, args, cmduser, text, prefix) => {
    //Start
    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    let Result = Math.floor(Math.random() * 101);

    let embed = new MessageEmbed()
      .setColor(ee.color)
      .setTitle(`Gay v2 Machine`)
      .setDescription(`${Member.user.username} Is ${Result}% Gay 🏳️‍🌈`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};