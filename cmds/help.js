const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let patrick = new Discord.RichEmbed()
.setAuthor('☄  Hello, i am AVbot', bot.user.avatarURL)
.setDescription('this is a feature I give to you | use this prefix `>`')
.addField('»Anime Image','`neko` `pat`')
.addField('»Core','`help` `ping` `stats` `welcome`')
.addField('»Economy','`balance` `addbalance`')
.addField('»Generator','`ascii`')
.addField('»Moderation','`kick` `ban` `warn` `autoroles` `addrole`')
.addField('»Utility','`avatar` `weather` `clear` `prefix`')
.addField('»Fun','`say` `vote` `8ball` `joke` `roll`')
.addField('»Image','`cat` `dog` `slap` `twice`')
.addField('»Support Bot','`votebot` `channel` `invite`')
.addField('»Music','`play` `pause` `resume` `volume` `stop` `skip` `np` `queue`')
.setColor("RANDOM")
  .setThumbnail(bicon)
.setFooter('©IndoXploit | By: Phenom | 2018')
message.channel.send(patrick);
}

exports.help = {
  name: "help"
}
