const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

          economy.fetchBalance(message.author.id + message.guild.id).then((i) => {
            const embed = new Discord.RichEmbed()
                .setDescription(`**${message.guild.name} Bank**`)
                .setColor(0xD4AF37) 
                .addField('Account Holder',message.author.username,true) 
                .addField('Account Balance',i.money,true)


            message.channel.send({embed})
  
}

exports.help = {
  name: "say"
}