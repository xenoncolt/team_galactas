const Discord = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const request = require("request");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "8ball",
  category: "🕹️ Fun",
  description: "Answers your Question",
  usage: "8ball <Questions>",
  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      const question = args.slice(0).join(" ");
      if (!question)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} ERROR | Please Add a Question`)
        );
      request(`https://8ball.delegator.com/magic/JSON/${question}`, function (e, response, body) {
        if (e) {
          console.log(String(e.stack).red);
          message.channel.send("Can't get 8ball replies, try again later.");
        }
        body = JSON.parse(body);
        let embedColor = `RANDOM`;
        if (body.magic.type === "Affirmative") embedColor = "GREEN";
        if (body.magic.type === "Contrary") embedColor = "PINK";
        if (body.magic.type === "Neutral") embedColor = "BLUE";

        message.channel.send(new Discord.MessageEmbed()
          .setTitle("8ball")
          .setColor(embedColor)
          .setThumbnail(message.author.displayAvatarURL({
            dynamic: true
          }))
          .addField("Question: ", question, false)
          .addField("Asked by: ", message.author.tag, false)
          .addField("Reply: ", body.magic.answer, false)
          .setFooter("API provided by Delegator 8ball")
        );
      });
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
