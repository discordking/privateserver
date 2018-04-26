const Discord = require("discord.js");


exports.run = async (bot, message, args) => {
let embed = new Discord.RichEmbed()
.setTitle('want to invite this bot to your server? :robot:')
.addField('Link','[Click Here](https://discordapp.com/oauth2/authorize?client_id=434304339268337665&scope=bot&permissions=8)', true)
.setColor("RANDOM")
.setFooter('©Beta | By: Alfian Verter | 2018')
message.channel.send({embed})

}
    
exports.help = {
name: "invite"
}
    
