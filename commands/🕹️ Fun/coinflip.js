const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const path = require("path");

module.exports = {
  name: path.parse(__filename).name,
  aliases: ["toss", "flip"],
  category: "🕹️ Fun",
  description: "Flip A Coin!",
  usage: "Coinflip",
  run: async (client, message, args, cmduser, text, prefix) => {
    //Start
    message.delete();
    const coins = ["Heads", "Tails", "Center"];

    let result = Math.floor(Math.random() * coins.length);

    const embed = new MessageEmbed()
      .setColor(ee.color)
      .setTitle(`Coin Is ${emoji.msg.coin}`)
      .setDescription(coins[result])
      .setFooter(`Fliped by ${message.author.username}`, `${message.author.displayAvatarURL({dynamic: true})}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};