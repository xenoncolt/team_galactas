const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");

module.exports = {
  name: "setup",
  category: "⚙️ Settings",
  aliases: ["musicsetup"],
  cooldown: 10,
  usage: "setup",
  description: "Creates an unique Music Setup for Requesting Songs!",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      let musiccmds = [];
      const commands = (category) => {
        return client.commands.filter((cmd) => cmd.category.toLowerCase().includes("music")).map((cmd) => `\`${cmd.name}\``);
      };
      for (let i = 0; i < client.categories.length; i += 1) {
        if (client.categories[i].toLowerCase().includes("music")) {
          musiccmds = commands(client.categories[i]);
        }
      }
      //get the old setup
      let oldsetup = client.setups.get(message.guild.id);
      //try to delete every single entry if there is a setup
      if (oldsetup.textchannel != "0") {
        try {
          message.guild.channels.cache.get(oldsetup.textchannel).delete().catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        } catch {}
        try {
          message.guild.channels.cache.get(oldsetup.voicechannel).delete().catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        } catch {}
        try {
          message.guild.channels.cache.get(oldsetup.category).delete().catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        } catch {}
      }
      //create a new Cateogry
      message.guild.channels.create("Music Area", {
          type: 'category',
          permissionOverwrites: [{
            id: message.guild.id,
            allow: ['VIEW_CHANNEL'],
          }, ],
        })
        .then((channel1) => {
          try {
            //set the maximumbitrate limit
            let maxbitrate = 96000;
            //get the boosts amount
            let boosts = message.guild.premiumSubscriptionCount;
            //change the bitrate limit regarding too boost level from https://support.discord.com/hc/de/articles/360028038352-Server-Boosting-
            if (boosts >= 2) maxbitrate = 128000;
            if (boosts >= 15) maxbitrate = 256000;
            if (boosts >= 30) maxbitrate = 384000;

            message.guild.channels.create(`│Music`, {
                type: 'voice', //voice Channel
                bitrate: maxbitrate, //set the bitrate to the maximum possible
                userLimit: 10, //set the limit for voice users
                parent: channel1.id, //ADMINISTRATOR
                permissionOverwrites: [{
                  id: message.guild.id,
                  allow: ['VIEW_CHANNEL', "CONNECT"],
                }, ],
              })
              .then((channel2) => {
                try {
                  message.guild.channels.create(`│requests`, {
                      type: 'text', // text channel
                      rateLimitPerUser: 6, //set chat delay
                      topic: `To request a Track, simply Type the **SONG NAME** into the Channel or the **URL** and the Bot will play it! Make sure that you are in the **right** Voice Channel(│Music)`,
                      parent: channel1.id,
                      permissionOverwrites: [{
                          id: message.guild.id,
                          allow: ['VIEW_CHANNEL', "SEND_MESSAGES", "ADD_REACTIONS"],
                        },
                        { //giving the Bot himself permissions
                          id: client.user.id,
                          allow: ["MANAGE_MESSAGES", "MANAGE_CHANNELS", "ADD_REACTIONS", "SEND_MESSAGES", "MANAGE_ROLES"]
                        }
                      ],
                    })
                    .then(async (channel3) => {
                      message.reply(`Setting up in <#${channel3.id}>`)
                      let embed1 = new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle("Team GalactasX | Request | Guide")
                        .setDescription(`Enter the song name or URL to play a song\n\nYou can also type \`${prefix}command <Parameters>\``)
                        .addField(`Commands`, musiccmds.join(", "))
                        .addField(`Reactions`, `${emoji.msg.rewind} Rewind 20 seconds\n${emoji.msg.forward} Forward 20 seconds\n${emoji.msg.pause_resume} Pause/Resume\n${emoji.msg.stop} Stop Track\n${emoji.msg.previous_track} Play previous\n`, true)
                        .addField(`\u200b`, `${emoji.msg.skip_track} Skip / Next\n${emoji.msg.replay_track} Replay Track\n${emoji.msg.reduce_volume} Volume -10 %\n${emoji.msg.raise_volume} Volume +10 %\n${emoji.msg.toggle_mute} Toggle Volume Mute`, true)
                        .addField(`\u200b`, `${emoji.msg.repeat_mode} Change repeat mode\n${emoji.msg.autoplay_mode} Toggle Autoplay\n${emoji.msg.shuffle} Shuffle the queue\n${emoji.msg.show_queue} Show the Queue\n${emoji.msg.show_current_track} Shows Current Track`, true)
                      let embed2 = new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle("Team GalactasX | Music Queue")
                        .setDescription(`Empty\nJoin a voice channel and queue songs by name or url in here.`)
                      let embed3 = new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle("Team GalactasX | Currently no song is playing!")
                        .setDescription(`Join a voice channel and enter a song name or url to play.`)
                        .setImage("https://cdn.discordapp.com/attachments/832180255103385650/864897921111556106/201173413_866341743955269_1227472870529417108_n.png")
                      //send a temp message
                      channel3.send(new MessageEmbed().setColor(ee.color).setDescription("Setting Up..")).then(msg => {
                        //react with embed 1
                        msg.edit(embed1)
                        //save it in the database
                        client.setups.set(message.guild.id, msg.id, "message_cmd_info");
                        //send another message
                        channel3.send(new MessageEmbed().setColor(ee.color).setDescription("Setting Up..")).then(msg => {
                          //edit the message again
                          msg.edit(embed2)
                          //save it in the database
                          client.setups.set(message.guild.id, msg.id, "message_queue_info");
                          //send an message again
                          channel3.send(new MessageEmbed().setColor(ee.color).setDescription("Setting Up..")).then(async msg => {
                            //edit the message
                            msg.edit(embed3)
                            //react with all reactions
                            await msg.react(emoji.react.rewind) //rewind 20 seconds
                            await msg.react(emoji.react.forward) //forward 20 seconds
                            await msg.react(emoji.react.pause_resume) //pause / resume
                            await msg.react(emoji.react.stop) //stop playing music
                            await msg.react(emoji.react.previous_track) //skip back  track / (play previous)
                            await msg.react(emoji.react.skip_track) //skip track / stop playing
                            await msg.react(emoji.react.replay_track) //replay track
                            await msg.react(emoji.react.reduce_volume) //reduce volume by 10%
                            await msg.react(emoji.react.raise_volume) //raise volume by 10%
                            await msg.react(emoji.react.toggle_mute) //toggle mute
                            await msg.react(emoji.react.repeat_mode) //change repeat mode --> track --> Queue --> none
                            await msg.react(emoji.react.autoplay_mode) //toggle autoplay mode
                            await msg.react(emoji.react.shuffle) //shuffle the Queue
                            await msg.react(emoji.react.show_queue) //shows the Queue
                            await msg.react(emoji.react.show_current_track) //shows the current Track
                            //create the collector
                            //save all other datas in the database
                            client.setups.set(message.guild.id, msg.id, "message_track_info");
                            client.setups.set(message.guild.id, channel3.id, "textchannel");
                            client.setups.set(message.guild.id, channel2.id, "voicechannel");
                            client.setups.set(message.guild.id, channel1.id, "category");
                            client.stats.inc("global", "setups");
                          });
                        })
                      })
                    })
                  //catch all errors
                } catch (e) {
                  //log them
                  console.log(String(e.stack).red)
                  //send information
                  return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`${emoji.msg.ERROR} Error | Something went Wrong`)
                    .setDescription(String("```" + e.stack + "```").substr(0, 2048))
                  );
                }
              })
          } catch (e) {
            //log them
            console.log(String(e.stack).red)
            //send information
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Something went Wrong`)
              .setDescription(String("```" + e.stack + "```").substr(0, 2048))
            );
          }
        })
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} Error | Something went Wrong`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  },
};

