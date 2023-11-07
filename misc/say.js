const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "say",
      group: "misc",
      memberName: "say",
      description: "Posts a raw message",
      ownerOnly: true,
      throttling: {
        usages: 1,
        duration: 100
      },
      args: [
        {
          type: "string",
          prompt:
            "What channel do you want to send it in? (channel name like `general` not `#general`)",
          key: "channel"
        },
        {
          type: "string",
          prompt: "What do you want the content to be?",
          key: "content"
        }
      ]
    });
  }
  hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.get("822802858415226892");
    if (msgObject.guild.id == 822802858415226892) {
      if (
        msgObject.member.roles.find(role => role.id === "459726631435632640")
      ) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("459726631435632640")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.id == "822802858751033363")
      ) {
        return true;
      }
    }
    return "Sorry 😣! You must be an Admin!";
  }
  async run(msgObject, { channel, content }) {
    try {
      msgObject.guild.channels.find("name", channel).send(content);
    } catch (error) {
      const log = new Discord.RichEmbed();
      log.setTitle(`Command Logging`);
      log.setColor(`1D37D9`);
      log.setDescription(
        `${msgObject.user} has ran the say command and said ${content}`
      );
      log.setFooter(
        `Command Logging`,
        `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
      );
      log.setTimestamp();

      this.client.channels.get(`824608781458604042`).send(log);
      msgObject.reply(
        `Sorry 😣! There has been an error while running this command!\n\n\`\`\`js\n${error}\`\`\``
      );
    }
  }
};
