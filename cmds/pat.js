const Discord = require("discord.js");
const superagent = require("superagent");

exports.run = async (bot, message, args) => {
let {body} = await superagent
.get("nekos.life/api/pat")
var catembed = new Discord.RichEmbed()
.setTitle('I will always wipe you :*')
.setColor("RANDOM")
.setImage(body.url)
message.channel.send(catembed)
}

exports.help = {
  name: "pat"
}
