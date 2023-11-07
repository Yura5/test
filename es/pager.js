const Discord = require("discord.js");
const client = new Discord.Client();
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class suggest extends Command {
  constructor(client) {
    super(client, {
      name: "pager",
      aliases: ["pg"],
      group: "es",
      memberName: "pager",
      description: "Creates a Pager",
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
  async run(msgObject, { description }){
    let channel = msgObject.guild.channels.find(channel => channel.name == "pager")
    let Embed = new Discord.RichEmbed()
      .setColor("#ff0000")
      .setTitle("Pager!")
      .setDescription(description)
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setTimestamp();
    channel.send("@here", Embed);
        const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${msgObject.author.tag} is using ;pager ${description}`)
    log.setAuthor(
      msgObject.member.displayName,
      msgObject.author.avatarURL
    )
    log.setTimestamp();
     log.setFooter(
      `Suggestion Logs`,
      `https://cdn.discordapp.com/icons/822901157953273956/70ff5a97efe92bb9398debbfe2447be1.png?size=128`
    );
    log.setTimestamp(); 
    msgObject.guild.channels.find(i => i.name === 'administration-logging').send(log)
    msgObject.reply(':laughing: :100: Successfully put your LEO Pager!')
  };
};
