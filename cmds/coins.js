const Discord = require("discord.js");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  //!coins
  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let uCoins = coins[message.author.id].coins;


  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
   .setDescription("Coin Kamu Sekarang, dapatkan coin dengan Online Setiap harinya !!")
  .setColor("#00FF00")
  .addField(':moneybag: ︾', uCoins)
.setFooter('©BETA | By: VERTER | 2018');
  message.channel.send(coinEmbed).then(msg => {msg.delete(10000)});

}

module.exports.help = {
  name: "coins"
}
