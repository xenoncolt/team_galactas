const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require("../../botconfig/config.json");
const emoji = require(`../../botconfig/emojis.json`);
const ee = require("../../botconfig/embed.json");

module.exports = {
    name: 'yttogether',
    category: "💪 Utility",
    description: 'Plays YT videos in voice channel',
    usage: '<prefix>yt-together',
    aliases: ['ytt'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, cmduser, text, prefix) => {
        const channel = message.member.voice.channel

        if (!channel) return message.channel.send(
            new Discord.MessageEmbed()
                .setDescription("You must be connected to a voice channel to use this command.")
                .setColor(ee.wrongcolor)
        )

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755600276941176913",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(invite => {
            if (!invite.code) return message.channel.send(
                new Discord.MessageEmbed()
                    .setDescription("I was unable to start a yt together session.")
                    .setColor(ee.wrongcolor)
            )
            message.channel.send(`Click This Link To Start a YouTube Together Session\nhttps://discord.com/invite/${invite.code}`)
        })
    }
}