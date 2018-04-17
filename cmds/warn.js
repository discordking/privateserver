const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("Could't find `user`.");
  let reason = args.join(" ").slice(22);

  let warnembed = new Discord.RichEmbed()
  .setTitle("Warned📫")
   .setColor("#9A2EFE")
  .addField("Reported User:", `${rUser}`)
  .addField("Reported By:", `${message.author}`)
  .addField("Channel:", message.channel)
  .addField("Time:", message.createdAt)
  .addField("Reason:", reason);

   rUser.send(warnembed);

  message.delete().catch(O_o=>{});

  return;
}

exports.help = {
  name: "report"
}
