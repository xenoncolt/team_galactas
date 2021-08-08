const {
	MessageEmbed
} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
	name: "developer",
	category: "🔰 Info",
	aliases: ["dev", "tomato"],
	description: "Shows Information about the Developer",
	useage: "developer",
	run: async (client, message, args) => {
		try {
			message.channel.send(new MessageEmbed()
				.setColor(ee.color)
				.setFooter(ee.footertext + " | Code  'x10'  == -5%", ee.footericon)
				.setTimestamp()
				.setThumbnail("https://cdn.discordapp.com/attachments/832180255103385650/862265652391444490/MOSHED-2021-7-7-15-17-29.gif")
				.setTitle("Xavier Colt#1919 | Manager of Team GX | Developer of Team Gx")
				.setURL("https://milrato.eu")
				.setDescription(`
				> Hello I am <@!709210314230726776>. Here you can find about me:

				> [Instagram](https://www.instagram.com/xavier.colt.xenon)
				
				> [Facebook](https://www.facebook.com/xenon.colt)
				
				> [Youtube](https://www.youtube.com/channel/UCHJqdv4U1Rqr4YWMc4HWpow)
				
				> Yeah i hope you like my stuff :v: <3`)
			).catch(error => console.log(error));
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
