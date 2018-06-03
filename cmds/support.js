const Discord = require("discord.js");


exports.run = async (bot, message, args) => {
message.channel.send('`Jika kamu ikhlas bantu kami dibulan puasa ini :( mari kita saling membantu untuk server ini :( kami sangat membutuhkan member support..`')
message.channel.send('<https://discord.gg/zxW7hf>')
message.delete();
}
    
exports.help = {
name: "support"
}
