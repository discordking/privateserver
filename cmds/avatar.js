const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    let embed = new Discord.RichEmbed()
        .setTitle(`${member.user.tag}`)
        .setDescription(`[Direct Link](${member.user.avatarURL})`)
.setColor("#00FFBF")
    .setImage(member.user.avatarURL)
     message.channel.send(embed)
}

exports.help = {
  name: "avatar"
}
