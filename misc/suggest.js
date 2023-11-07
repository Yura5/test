const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");

const client = new Discord.Client();
module.exports = class suggest extends Command {
  constructor(client) {
    super(client, {
      name: "suggest",
      aliases: ["sg"],
      group: "misc",
      memberName: "suggest",
      description: "Suggests something to be added into the game",
      ownerOnly: false,
                        throttling: {
        usages: 1,
        duration: 40
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
  async run(msgObject, { description }) {
    let channel = client.channels.get("821179809899479069")
    const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${msgObject.author.tag} is using ;suggest ${description}`)
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
    let Embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Suggestion")
      .setDescription(description)
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setTimestamp();
     msgObject.guild.channels.find(i => i.name === 'suggestions').send(Embed).then(Embed => {
        Embed.react("✔️")
       Embed.react("❌")
          msgObject.reply(
        "**Congratulations, **suggestion successfully made!:smile: "
      );
    });
  }
};
