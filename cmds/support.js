const Discord = require("discord.js");


exports.run = async (bot, message, args) => {
message.channel.send('`Jika kamu ikhlas bantu kami dibulan puasa ini :( kami sangat membutuhkan member support..` @everyone @here')
message.channel.send('<https://discord.gg/zxW7hf>')
message.delete();
}
    
exports.help = {
name: "support"
}
