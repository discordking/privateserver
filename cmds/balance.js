const Discord = require("discord.js");
const economy = require('discord-eco');

exports.run = async (bot, message, args) => {

          economy.fetchBalance(message.author.id + message.guild.id).then((i) => {
            const embed = new Discord.RichEmbed()
                .setDescription(`**${message.guild.name} Bank**`)
.setColor("RANDOM")
            .addField('Account Holder',message.author.username, true) 
                .addField('Account Balance',i.money, true)


            message.channel.send({embed})
                    
          })
          
}

exports.help = {
  name: "say"
}
