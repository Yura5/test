const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const client = new Discord.Client();
const request = require("request-promise");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "ssu",
      aliases: ["serverstartup"],
      group: "misc",
      memberName: 'ssu',
      description: "Posts an SSU needed by Staff / Government",
      ownerOnly: false,
      throttling: {
        usages: 1,
        duration: 500
      },
      args: [
        {
          type: "string",
          prompt: "What are the notes for your Server Startup?",
          key: "description"
        }
      ]
    });
  }
  hasPermission(msgObject) {
    if (msgObject.member.roles.find(role => role.name === "Bot")) {
      return true;
    } else if (
      msgObject.author.id == "675794471065092161"
    ) {
      return true;
    } else if (msgObject.member.roles.find(role => role.name == "Admin")) {
      return true;
    } else if (msgObject.member.roles.find(role => role.name == "Moderator")) {
      return true;
    }
    return "Sorry 😣! You must be a Mayflower Moderator or Admin!";
  }
   async run(msgObject, { description }) {
   let channel = msgObject.guild.channels.find(channel => channel.name == "ssu")
    let Embed = new Discord.RichEmbed()
         
      .setColor("RANDOM")
      .setTitle("**Server Startup**")
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setDescription(`:link: Link
      [State of Mayflower](https://www.roblox.com/games/6569031803/New-Haven-County)
      :book:Notes 
      ${description}`)
      .setFooter('State Of Mayflower')
      .setTimestamp();
   channel.send("@here", Embed);
        msgObject.reply(`**Congrats** :sunglasses:! You have announced your **Server Startup**!`);
  }
};
