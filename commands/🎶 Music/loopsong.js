const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `loopsong`,
  category: `🎶 Music`,
  aliases: [`repeatsong`, `ls`, `rs`, `repeattrack`, `looptrack`, `lt`, `rt`],
  description: `Repeats the current song`,
  usage: `loopsong`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      //define the Embed
      const embed = new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.repeat_mode} Changed Track loop to: ${player.trackRepeat ? `${emoji.msg.disabled} disabled` : `${emoji.msg.enabled} active`}`)
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
      //if there is active queue loop, disable it + add embed information
      if (player.queueRepeat) {
        embed.setDescription(`And **Queue** Repeat got **${emoji.msg.disabled} disabled**`);
        player.setQueueRepeat(false);
      }
      //set track repeat to revers of old track repeat
      player.setTrackRepeat(!player.trackRepeat);
      //send informational message
      return message.channel.send(embed);
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
