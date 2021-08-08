//Here the command starts
const {
	MessageEmbed
} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
	name: "support", 
	category: "🔰 Info", 
	aliases: ["server", "discord", "dc"], 
	cooldown: 5, 
	usage: "support",
	description: "Sends you a Link to the Support Server", 
	run: async (client, message, args, user, text, prefix) => {
		message.channel.send("If you want to support us.\nPlease Boost our discord server.\nIt will be very helpfull for us.\n**Thank You**");
	}
};
