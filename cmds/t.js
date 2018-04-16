const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);

       message.guild.member(kUser).ban(kReason);
    
  try{      

  } catch (e) {
      
  }
}

module.exports.help = {
  name:"t"
}
