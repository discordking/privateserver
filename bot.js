const Discord = require("discord.js");
const superagent = require("superagent");
const weather = require("weather-js");
const economy = require('discord-eco');
const bot = new Discord.Client({disableEveryone: true});
const moment = require("moment");
const momentDurationFormat = require("moment-duration-format");
const fs = require("fs");
const config = require("./config.json");
const figlet = require('figlet');
const Command = require("klasa");
const prefix = require("./config.json");
let coins = require("./coins.json");
let xp = require("./xp.json");
let cooldown = new Set();
let cdseconds = 5;


bot.on("ready", async () => {
    console.log(`Logged in as : ${bot.user.tag}`);
    console.log(`${bot.user.username} is ready!`)
    
bot.user.setUsername("VERTER")
            
    function randomStatus() {
        let status = [`on ${bot.guilds.size}ðŸŒŽ servers.`, `with ${bot.users.size.toLocaleString()}ðŸŽ­ users`, 'mention @VERTER', 'Use >help']
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
			prefixes: config.prefix
			
		};
	}
	let prefix = prefixes[message.guild.id].prefixes;
let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;

  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  });
  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#0000FF")
  .addField("💸", `${coinAmt} coins added!`);

  message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
  }

  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }
    
    let msg = message.content.toLowerCase();
    let args = message.content.slice(prefix.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();

   if (!msg.startsWith(prefix)) return;
      
    try {
      let commandFile = require(`./cmds/${cmd}.js`);
      commandFile.run(bot, message, args);
    } catch (e) {
      console.log(e.message)
    } finally {
      console.log(`${message.author.tag} menggunakan perintah ${prefix}${cmd}`);
    }


  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setColor(purple)
    .addField("New Level", curlvl + 1);

    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });

  let prefix = prefixes[message.guild.id].prefixes;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
	
  });

bot.on("message", async autoresponder => {
    if(autoresponder.author.bot) return;
    if(autoresponder.channel.type === "dm") return;
      
        let msg = autoresponder.content.toLowerCase();
        let sender = autoresponder.author;
        if (autoresponder.content.startsWith(prefix)) return;
    
    if (autoresponder.content === `<@!${bot.user.id}>`) {
    autoresponder.react('ðŸ¥');
    return autoresponder.channel.send(`Hi ${sender},` + ' use this command ``>help`` ')
    }
    
    if (autoresponder.content === `<@${bot.user.id}>`) {
    autoresponder.react('ðŸ¥');
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

bot.on('guildMemberAdd', member => {

    console.log(`${member}`, "has joined" + `${member.guild.name}`)

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

bot.on('guildMemberRemove', member => {
    console.log(`${member}` + "has left" + `${member.guild.name}` + "Sending leave message now")
    console.log("Leave Message Sent")
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
