const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const playermanager = require(`../../handlers/playermanager`);
const {
  createBar
} = require(`../../handlers/functions`);
module.exports = {
  name: `queuestatus`,
  category: `🎶 Music`,
  aliases: [`qs`, `status`, `queuestats`, `qus`],
  description: `Shows the current Queuestatus`,
  usage: `queuestatus`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      //toggle autoplay
      let embed = new MessageEmbed()
      try {
        embed.setTitle(`Connected to:  \`🔈${client.channels.cache.get(player.voiceChannel).name}\``)
      } catch {}
      try {
        embed.setDescription(`And bound to: \`#${client.channels.cache.get(player.textChannel).name}\`   **▬**   Queue length: \`${player.queue.length} Songs\``)
      } catch {}
      try {
        embed.addField(`${emoji.msg.raise_volume} Volume`, `${player.volume}%`, true)
      } catch {}
      try {
        embed.addField(`${emoji.msg.equalizer} Equalizer: `, `${emoji.msg.playing} Music`, true)
      } catch {}
      try {
        embed.addField(`${player.queueRepeat ? `${emoji.msg.autoplay_mode} Queue Loop: ` : `${emoji.msg.autoplay_mode} Song Loop: `}`, `${player.queueRepeat ? `${emoji.msg.SUCCESS} Enabled` : player.trackRepeat ? `${emoji.msg.SUCCESS} Enabled` : `${emoji.msg.ERROR} Disabled`}`, true)
      } catch {}
      try {
        embed.addField(`${emoji.msg.leave_on_empty} Leave on Empty Channel: `, `${config.settings.leaveOnEmpty_Channel.enabled ? `${emoji.msg.SUCCESS} Enabled` : `${emoji.msg.ERROR} Disabled`}`, true)
      } catch {}
      try {
        embed.addField(`${emoji.msg.repeat_mode} Leave on Empty Queue: `, `${config.settings.LeaveOnEmpty_Queue.enabled ? `${emoji.msg.SUCCESS} Enabled` : `${emoji.msg.ERROR} Disabled`}`, true)
      } catch {}
      try {
        embed.addField(`${emoji.msg.autoplay_mode} Autoplay`, `${player.get(`autoplay`) ? `${emoji.msg.SUCCESS} Enabled` : `${emoji.msg.ERROR} Disabled`}`, true)
      } catch {}
      try {
        embed.addField(`${emoji.msg.premium} Premium GUILD`, `${client.premium.get(player.guild).enabled ? `${emoji.msg.SUCCESS} Enabled` : `${emoji.msg.ERROR} Disabled`}`, true)
      } catch {}
      try {
        embed.addField(`${emoji.msg.premium} Premium USER`, `${client.premium.get(player.get(`playerauthor`)).enabled ? `${emoji.msg.SUCCESS} Enabled` : `${emoji.msg.ERROR} Disabled`}`, true)
      } catch {}
      try {
        embed.addField(`${emoji.msg.premium} 24/7 AFK Setup`, `PLAYER: ${player.get(`afk-${player.get(`playerauthor`)}`) ? `${emoji.msg.SUCCESS} Enabled` : `${emoji.msg.ERROR} Disabled`}\nGUILD: ${player.get(`afk-${player.guild}`) ? `${emoji.msg.SUCCESS} Enabled` : `${emoji.msg.ERROR} Disabled`}`, true)
      } catch {}
      try {
        embed.setColor(ee.color)
      } catch {}
      try {
        embed.setFooter(ee.footertext, ee.footericon);
      } catch {}
      try {
        embed.addField(`${emoji.msg.disk} Current Track: `, `${player.playing ? `${emoji.msg.resume}` : `${emoji.msg.pause}`} [**${player.queue.current.title}**](${player.queue.current.uri})`)
      } catch {}
      try {
        embed.addField(`${emoji.msg.time} Progress: `, createBar(player))
      } catch {}
      message.channel.send(embed);
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

