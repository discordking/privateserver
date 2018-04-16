const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let kReason = args.join(" ").slice(22);
    
       message.guild.member(kUser);
    
}

module.exports.help = {
  name:"t"
}
