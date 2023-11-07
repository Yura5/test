const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const client = new Discord.Client();
const request = require("request-promise");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "announce",
      aliases: [],
      group: "misc",
      memberName: "announce",
      description: "Posts an announcement needed by Staff / Government",
      ownerOnly: false,
      throttling: {
        usages: 1,
        duration: 500
      },
      args: [
        {
          type: "string",
          prompt: "What is the Description?",
          key: "description"
        }
      ]
    });
  }
  hasPermission(msgObject) {
    if (msgObject.member.roles.find(role => role.name === "LPD")) {
      return true;
    } else if (
      msgObject.author.id == "675794471065092161"
    ) {
      return true;
    } else if (msgObject.member.roles.find(role => role.name == "PPD")) {
      return true;
    } else if (msgObject.member.roles.find(role => role.name == "NHCSO")) {
      return true;
    } else if (msgObject.member.roles.find(role => role.name == "MSP")) {
      return true;
    } else if (msgObject.member.roles.find(role => role.name == "Admin")) {
      return true;
    } else if (msgObject.member.roles.find(role => role.name == "Moderator")) {
      return true;
    }
    return "Sorry 😣! You must be ES!";
  }
  async run(msgObject, { description }) {
   let channel = msgObject.guild.channels.find(channel => channel.name == "announcements")
    let Embed = new Discord.RichEmbed()
      
      .setColor("#0C457D")
      .setTitle("**Announcement**")
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setDescription(description)
       .setDescription(description)
      .setFooter(
        "State Of Mayflower",
        "https://cdn.discordapp.com/attachments/823016137410871306/823693121208582154/a7ab98d9916c3482d5c4f0156b786b60_1.webp"
      
        )
      .setTimestamp()
    channel.send(Embed);
        msgObject.reply(`**Congrats** :sunglasses:! You have announced your Announcement!`);
  }
};
