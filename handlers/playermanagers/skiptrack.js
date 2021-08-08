var {
  MessageEmbed
} = require("discord.js")
var ee = require("../../botconfig/embed.json")
var config = require("../../botconfig/config.json")
var {
  format,
  isrequestchannel,
  delay,
  edit_request_message_queue_info,
  edit_request_message_track_info,
  arrayMove
} = require("../functions")

//function for playling song + skipping
async function skiptrack(client, message, args, type) {
  var search = args.join(" ");
  try {
    var res;
    var player = client.manager.players.get(message.guild.id);
    if(!player)
      player = client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeafen: config.settings.selfDeaf,
      });
    let state = player.state;
    if (state !== "CONNECTED") { 
      //set the variables
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      player.connect();
      player.stop();
    }
    try {
      // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
      if (type.split(":")[1] === "youtube" || type.split(":")[1] === "soundcloud")
        res = await client.manager.search({
          query: search,
          source: type.split(":")[1]
        }, message.author);
      else {
        res = await client.manager.search(search, message.author);
      }
      // Check the load type as this command is not that advanced for basics
      if (res.loadType === "LOAD_FAILED") throw res.exception;
      else if (res.loadType === "PLAYLIST_LOADED") throw {
        message: "Playlists are not supported with this command. Use   ?playlist  "
      };
    } catch (e) {
      console.log(String(e.stack).red)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ Error | There was an error while searching:`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
    if (!res.tracks[0])
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(String("❌ Error | Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")
        .setDescription(`Please retry!`)
      );
    //if the player is not connected, then connect and create things
    if (state !== "CONNECTED") {
      //set the variables
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      player.connect();
      //add track
      player.queue.add(res.tracks[0]);
      //play track
      player.play();
      player.pause(false);
      //if its inside a request channel edit the msg
      var irc = await isrequestchannel(client, player.textChannel, player.guild);
      if (irc) {
        edit_request_message_track_info(client, player, player.queue.current);
        edit_request_message_queue_info(client, player);
      }
    }
    else if(!player.queue || !player.queue.current){
      //add track
      player.queue.add(res.tracks[0]);
      //play track
      player.play();
      player.pause(false);
      //if its inside a request channel edit the msg
      var irc = await isrequestchannel(client, player.textChannel, player.guild);
      if (irc) {
        edit_request_message_track_info(client, player, player.queue.current);
        edit_request_message_queue_info(client, player);
      }
    }
    else {
      player.queue.add(res.tracks[0]);
      player.queue[player.queue.length - 1];
      //move the Song to the first position using my selfmade Function and save it on an array
      var QueueArray = arrayMove(player.queue, player.queue.length - 1, 0);
      //clear teh Queue
      player.queue.clear();
      //now add every old song again
      for (var track of QueueArray)
        player.queue.add(track);
      //skip the track
      player.stop();

      var irc = await isrequestchannel(client, player.textChannel, player.guild);
      if (irc) {
        edit_request_message_queue_info(client, player);
      }
      return;
    }
  } catch (e) {
    console.log(String(e.stack).red)
    return message.channel.send(new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(String("❌ Error | Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")
    )
  }
}

module.exports = skiptrack;

