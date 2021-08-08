const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('ms');
const config = require("../../botconfig/config.json");
const emoji = require(`../../botconfig/emojis.json`);
const ee = require("../../botconfig/embed.json");
const path = require("path");

module.exports = {
    name: path.parse(__filename).name,
    aliases: ['fakehack'],
    category: "🕹️ Fun",
    description: 'fake hack someone',
    useage: '<prefix>hack @mention',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, cmduser, text, prefix) => {
        var ips = [
            '103.130.170.144',
            '103.137.162.87',
            '103.230.107.60',
            '103.244.13.143',
            '103.130.170.180',
            '180.210.188.116',
            '123.200.2.232',
            '121.200.63.109',
            '114.31.21.146'
        ]
        var ipadress = ips[Math.floor(Math.random() * ips.length)];

        if (!args[0]) return message.channel.send(
            new MessageEmbed()
            .setColor("RED")
            .setAuthor(message.author.tag)
            .setDescription('**Who do you want to hack?\nTag Please**')
            .setFooter(`Requested by ${message.author.username}`)
        )
        const Hacking = args.slice(0).join(" ") && args.shift().toLowerCase()

        let msg = await message.channel.send(
            new MessageEmbed()
            .setColor("RED")
            .setAuthor(message.author.tag)
            .setDescription(`**Hacking ${Hacking}**`)
            .setFooter(`Hacking by Xavier Colt`)
        )
        let time = 15000
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`[▖] Finding discord gmail ${Hacking}...${emoji.msg.hack}`)
                .setFooter(`Its hacking bro. Xavier needs time.`)
            )
        }, time)
        time += 15000
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`[▘] Gmail: ${Hacking}@gmail.com`)
                .setFooter(`Wait nigga.`)
            )
        }, time)
        time += 15000
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`[▝] Getting user password ${emoji.msg.hack}`)
                .setFooter(`Just wait for password.`)
            )
        }, time)
        time += 15000
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`[▗] Password:`)
                .setFooter("Lamo, That's his password.")
            )
        }, time)
        time += 15000
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`[▖]Getting account access...${emoji.msg.hack}`)
                .setFooter("Hold on")
            )
        }, time)
        time += 15000
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`[▘] Collecting data...${emoji.msg.hack}`)
                .setFooter("Just hold on")
            )
        }, time)
        time += 15000
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`[▝] Hacking all accounts linked to ${Hacking}@gmail.com....${emoji.msg.hack}`)
                .setFooter("Hehe Boi. Just wait a few more second.")
            )
        }, time)
        time += 15000
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`[▗] Fiding ip adress...${emoji.msg.hack}`)
                .setFooter("Xavier Colt hacking this user. Wait lamo.")
            )
        }, time)
        time += 15000
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`[▖] Ip: ${ipadress}`)
                .setFooter("Wait lamo for more information.")
            )
        }, time)
        time += 15000
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`[▘] Information collected...${emoji.msg.hack}`)
                .setFooter("Wait lamo Wait")
            )
        }, time)
        time += 15000
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`[▝] Downloading virus...${emoji.msg.hack}`)
                .setFooter("Hehe. Now Xavier Puting virus in his computer.")
            )
        }, time)
        time += 15000
        setTimeout(function () {
            msg.edit(
                new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription(`[▗]Destroying friends list...${emoji.msg.hack}`)
                .setFooter("Really, do you want him alone?")
            )
        }, time)
        time += 15000
        setTimeout(function () {
            new MessageEmbed()
            .setColor("RED")
            .setAuthor(message.author.tag)
            .setDescription(`[▖] Getting results...${emoji.msg.hack}`)
            .setFooter("Yeah baby yeah yeah wait")
        }, time)
        time += 15000
        setTimeout(function () {
            new MessageEmbed()
            .setColor("RED")
            .setAuthor(message.author.tag)
            .setDescription(`User ${Hacking} is Hacked By ${message.author.tag} Hehe`)
            .setFooter("Sike That's the wrong Number")
        }, time)
        time += 3 * 1000
    }
}