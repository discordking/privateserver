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
const modRole = 'Administrator';

const items = JSON.parse(fs.readFileSync('items.json', 'utf8'));

bot.on("ready", async () => {
    console.log(`Logged in as : ${bot.user.tag}`);
    console.log(`${bot.user.username} is ready!`)
    
bot.user.setUsername("Familly Game Night")
            
    function randomStatus() {
        let status = [`on ${bot.guilds.size}🌎 servers.`, `with ${bot.users.size.toLocaleString()}🎭 users`, 'mention @Family Game Night', 'Use >help']
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
  });

bot.on("message", async autoresponder => {
    if(autoresponder.author.bot) return;
    if(autoresponder.channel.type === "dm") return;
      
        let msg = autoresponder.content.toLowerCase();
        let sender = autoresponder.author;
        if (autoresponder.content.startsWith(prefix)) return;
    
    if (autoresponder.content === `<@!${bot.user.id}>`) {
    autoresponder.react('🍥');
    return autoresponder.channel.send(`Hi ${sender},` + ' use this command ``>help`` ')
    }
    
    if (autoresponder.content === `<@${bot.user.id}>`) {
    autoresponder.react('🍥');
    return autoresponder.channel.send(`Hi ${sender},` + ' use this command ``>help`` ')
    }
        
});

bot.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find('name', 'member-log');
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
    let channel = member.guild.channels.find('name', 'member-log');
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

client.on('message', message => {

    // Variables
    let prefix = '~';
    let msg = message.content.toUpperCase();
    // Lets also add some new variables
    let cont = message.content.slice(prefix.length).split(" "); // This slices off the prefix, then stores everything after that in an array split by spaces.
    let args = cont.slice(1); // This removes the command part of the message, only leaving the words after it seperated by spaces

    // Commands

    // Buy Command - You can buy items with this.
    if (msg.startsWith(`${prefix}BUY`)) { // We need to make a JSON file that contains the items

        // Variables
        let categories = []; // Lets define categories as an empty array so we can add to it.

        // We want to make it so that if the item is not specified it shows a list of items
        if (!args.join(" ")) { // Run if no item specified...

            // First, we need to fetch all of the categories.
            for (var i in items) { // We can do this by creating a for loop.

                // Then, lets push the category to the array if it's not already in it.
                if (!categories.includes(items[i].type)) {
                    categories.push(items[i].type)
                }

            }

            // Now that we have the categories we can start the embed
            const embed = new Discord.RichEmbed()
                .setDescription(`Available Items`)
                .setColor(0xD4AF37)

            for (var i = 0; i < categories.length; i++) { // This runs off of how many categories there are. - MAKE SURE YOU DELETE THAT = IF YOU ADDED IT.

                var tempDesc = '';

                for (var c in items) { // This runs off of all commands
                    if (categories[i] === items[c].type) {

                        tempDesc += `${items[c].name} - $${items[c].price} - ${items[c].desc}\n`; // Remember that \n means newline

                    }

                }

                // Then after it adds all the items from that category, add it to the embed
                embed.addField(categories[i], tempDesc);

            }

            // Now we need to send the message, make sure it is out of the for loop.
            return message.channel.send({
                embed
            }); // Lets also return here.

            // Lets test it! x2

        }

        // Buying the item.

        // Item Info
        let itemName = '';
        let itemPrice = 0;
        let itemDesc = '';

        for (var i in items) { // Make sure you have the correct syntax for this.
            if (args.join(" ").trim().toUpperCase() === items[i].name.toUpperCase()) { // If item is found, run this...
                itemName = items[i].name;
                itemPrice = items[i].price;
                itemDesc = items[i].desc;
            }
        }

        // If the item wasn't found, itemName won't be defined
        if (itemName === '') {
            return message.channel.send(`**Item ${args.join(" ").trim()} not found.**`)
        }

        // Now, lets check if they have enough money.
        economy.fetchBalance(message.author.id + message.guild.id).then((i) => { // Lets fix a few errors - If you use the unique guild thing, do this.
            if (i.money <= itemPrice) { // It's supposed to be like this instead...

                return message.channel.send(`**You don't have enough money for this item.**`);
            }

            economy.updateBalance(message.author.id + message.guild.id, parseInt(`-${itemPrice}`)).then((i) => {

                message.channel.send('**You bought ' + itemName + '!**');

                // You can have IF statements here to run something when they buy an item.
                if (itemName === 'Helper Role') {
                    message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", "Helper")); // For example, when they buy the helper role it will give them the helper role.
                }

            })

        })

    }

    // Ping - Let's create a quick command to make sure everything is working!
    if (message.content.toUpperCase() === `${prefix}PING`) {
        message.channel.send('Pong!');
    }

    // Add / Remove Money For Admins
    if (msg.startsWith(`${prefix}ADDMONEY`)) {

        // Check if they have the modRole
        if (!message.member.roles.find("name", modRole)) { // Run if they dont have role...
            message.channel.send('**You need the role `' + modRole + '` to use this command...**');
            return;
        }

        // Check if they defined an amount
        if (!args[0]) {
            message.channel.send(`**You need to define an amount. Usage: ${prefix}BALSET <amount> <user>**`);
            return;
        }

        // We should also make sure that args[0] is a number
        if (isNaN(args[0])) {
            message.channel.send(`**The amount has to be a number. Usage: ${prefix}BALSET <amount> <user>**`);
            return; // Remember to return if you are sending an error message! So the rest of the code doesn't run.
        }

        // Check if they defined a user
        let defineduser = '';
        if (!args[1]) { // If they didn't define anyone, set it to their own.
            defineduser = message.author.id;
        } else { // Run this if they did define someone...
            let firstMentioned = message.mentions.users.first();
            defineduser = firstMentioned.id;
        }

        // Finally, run this.. REMEMBER IF you are doing the guild-unique method, make sure you add the guild ID to the end,
        economy.updateBalance(defineduser + message.guild.id, parseInt(args[0])).then((i) => { // AND MAKE SURE YOU ALWAYS PARSE THE NUMBER YOU ARE ADDING AS AN INTEGER
            message.channel.send(`**User defined had ${args[0]} added/subtraction from their account.**`)
        });

    }

    // Balance & Money
    if (msg === `${prefix}BALANCE` || msg === `${prefix}MONEY`) { // This will run if the message is either ~BALANCE or ~MONEY

        // Additional Tip: If you want to make the values guild-unique, simply add + message.guild.id whenever you request.
        economy.fetchBalance(message.author.id + message.guild.id).then((i) => { // economy.fetchBalance grabs the userID, finds it, and puts the data with it into i.
            // Lets use an embed for This
            const embed = new Discord.RichEmbed()
                .setDescription(`**${message.guild.name} Bank**`)
                .setColor(0xD4AF37) // You can set any HEX color if you put 0x before it.
                .addField('Account Holder', message.author.username, true) // The TRUE makes the embed inline. Account Holder is the title, and message.author is the value
                .addField('Account Balance', i.money, true)

            // Now we need to send the message
            message.channel.send({
                embed
            })

        })

    }

});


bot.login(process.env.BOT_TOKEN);
