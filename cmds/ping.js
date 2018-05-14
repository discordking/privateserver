const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
let ping = Date.now() - message.createdTimestamp
let embed = new Discord.RichEmbed()
.setTitle('Your ping results:')
.addField('Signal :signal_strength:',`${ping}ms`, true)
.addField('Websocket 💞' , `${Math.round(bot.ping)} ms`, false)
.setColor("RANDOM")
.setFooter('©BOT-OFFICIAL-RAINBOW | By: Alfian Verter | 2018')
message.channel.send({embed})
}

exports.help = {
  name: "ping"
}
