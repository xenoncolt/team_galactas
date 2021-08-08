const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const emoji = require(`../../botconfig/emojis.json`);
const ee = require("../../botconfig/embed.json");
const figlet = require("figlet");
const { promisify } = require("util");
const figletAsync = promisify(figlet);
const path = require("path");

module.exports = {
  name: path.parse(__filename).name,
  category: "🕹️ Fun",
  description: "Ascii Art!",
  usage: "Ascii <Text>",
  run: async (client, message, args, cmduser, text, prefix) => {
    //Start

    message.delete();
    
    let Content = args.join(" ");

    if (!Content) return message.channel.send(`Please Give Me Text!`);

    let Result = await figletAsync(Content);

    let embed = new MessageEmbed()
      .setColor(ee.color)
      .setDescription("```" + Result + "```")
      .setTimestamp();

    if (Content.length > 20)
      return message.channel.send(`Please Make Shorter! | Limit : 20`);

    message.channel.send(embed);


    //End
  }
};