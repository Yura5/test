const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const client = new Discord.Client();
const request = require("request-promise");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "poll",
      aliases: [],
      group: "misc",
      memberName: "poll",
      description: "Test",
      ownerOnly: false,
      throttling: {
        usages: 1,
        duration: 500
      },
      args: [
        {
          type: "string",
          prompt: "What is the Poll message?",
          key: "description"
        }
      ]
    });
  }
  hasPermission(msgObject) {
    if (msgObject.member.roles.find(role => role.name === "Admin")) {
      return true;
    } else if (
      msgObject.author.id == "675794471065092161"
    ) {
      return true;
    } else if (msgObject.member.roles.find(role => role.name == "Developer")) {
      return true;
    }
  }
  async run(msgObject, { description }) {
   let channel = msgObject.guild.channels.find(channel => channel.name == "polls")
    let Embed = new Discord.RichEmbed()
      
      .setColor("RANDOM")
      .setTitle(" __**Poll**__")
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
        )
    .setDescription(description)
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setFooter(
        "State Of Mayflower",
        "https://cdn.discordapp.com/attachments/823016137410871306/823693121208582154/a7ab98d9916c3482d5c4f0156b786b60_1.webp"
      
        )
    .setTimestamp()
     msgObject.guild.channels.find(i => i.name === 'polls').send(Embed).then(Embed => {
        Embed.react("✔️")
       Embed.react("❌")
          msgObject.reply(
        "**Congratulations, **Poll was successfully made!:smile: "
      );
    });
  }
};
