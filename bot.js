const Discord = require("discord.js");
const superagent = require("superagent");
const weather = require("weather-js");
const economy = require('discord-eco');
const bot = new Discord.Client({disableEveryone: true});
const moment = require("moment");
const botconfig = require("./config.json");
bot.commands = new Discord.Collection();
const momentDurationFormat = require("moment-duration-format");
const fs = require("fs");
const config = require("./config.json");
const figlet = require('figlet');
const Command = require("klasa");
const prefix = require("./config.json");
let cooldown = new Set();
let cdseconds = 5;

fs.readdir("./cmds/", (err, files) => {

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./cmds/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
	
    function randomStatus() {
        let status = [`on ${bot.guilds.size} servers.`, `with ${bot.users.size.toLocaleString()} users`, 'mention @VERTER', 'Use >help']
          let rstatus = Math.floor(Math.random() * status.length);
        bot.user.setActivity(status[rstatus], {type: 'STREAMING'});
    }; setInterval(randomStatus, 20000)
  });


bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
	
  let prefix = prefixes[message.guild.id].prefixes;
  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply("You have to wait 5 seconds between commands.")
  }
 // if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
 // }


  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)

});

bot.on("message", async autoresponder => {
    if(autoresponder.author.bot) return;
    if(autoresponder.channel.type === "dm") return;
      
        let msg = autoresponder.content.toLowerCase();
        let sender = autoresponder.author;
        if (autoresponder.content.startsWith(prefix)) return;
    
    if (autoresponder.content === `<@!${bot.user.id}>`) {
    autoresponder.react(':red_car:');
    return autoresponder.channel.send(`Hi ${sender},` + ' use this command ``>help`` ')
    }
    
    if (autoresponder.content === `<@${bot.user.id}>`) {
    autoresponder.react(':red_car:');
    return autoresponder.channel.send(`Hi ${sender},` + ' use this command ``>help`` ')
    }
        
});

bot.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find('name', 'welcome-goodbye');
    let memberavatar = member.user.displayAvatarURL;
        if (!channel) return;
        let embed = new Discord.RichEmbed()
.setColor("RANDOM")
	.setThumbnail(memberavatar)
        .addField(':bust_in_silhouette: | name : ', `${member}`)
        .addField(':microphone2: | Welcome!', `Welcome to the server, ${member}`)
        .addField(':family_mwgb: | Your are the member', `${member.guild.memberCount}`)
        .addField("Name", `<@` + `${member.id}` + `>`, true)
        .addField('Server', `${member.guild.name}`, true )
        .setFooter(`${member.guild.name}`)
        .setTimestamp()

        channel.sendEmbed(embed);
});

bot.on('guildMemberRemove', member => {
    let channel = member.guild.channels.find('name', 'welcome-goodbye');
    let memberavatar = member.user.displayAvatarURL;
        if (!channel) return;
        let embed = new Discord.RichEmbed()
.setColor("RANDOM")
	.setThumbnail(memberavatar)
        .addField(':bust_in_silhouette: | Name:', `${member}`)
        .addField('Has Let the Server', 'Good Bye !')
        .addField(':family_mwgb: | The server now as', `${member.guild.memberCount}` + " members")
        .setFooter(`${member.guild.name}`)
        .setTimestamp()

        channel.sendEmbed(embed);
});

bot.on("guildMemberAdd", member => {
	let autorole = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
	if (!autorole[member.guild.id]) { // jika tidak ada autorole yang di set, agar tidak error saat ada yang join
		autorole[member.guild.id] = {
			autorole: config.autorole
		};
	}
	var role = autorole[member.guild.id].role;
	if (!role) return; // jika autorole 0 maka akan dihentikan dan tidak menyebabkan error
	member.addRole(role);
});

bot.login(process.env.BOT_TOKEN);
