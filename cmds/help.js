const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let patrick = new Discord.RichEmbed()
.setAuthor('✨  Hello, i am Cosmic  ✨', bot.user.avatarURL)
.setDescription('this is a feature I give to you | use this prefix `)`')
.addField('Anime:','`neko` `pat`', true)
.addField('Core:','`help` `ping` `stats` `welcome`', true)
.addField('Economy:','`balance` `addbalance`', true)
.addField('Moderation:','`clear` `kick` `ban` `report` `autoroles`', true)
.addField('Utility:','`avatar` `weather`', true)
.addField('Fun:','`say` `vote`', true)
.addField('Image:','`cat` `dog` `slap`', true)
.addField('Support Bot:','`votebot` `channel` `invite`', true)
.addField('Music:','`play` `pause` `resume` `volume` `stop` `skip` `np` `queue`', true)
        .setColor("#9A2EFE")
.setThumbnail(bicon)
.setFooter('©Beta | By: Alfian Verter | 2018')
message.channel.send(patrick);
}

exports.help = {
  name: "help"
}
