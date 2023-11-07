const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
module.exports = class uban extends Command {
  constructor(client) {
    super(client, {
      name: "unban",
      group: "administrator",
      memberName: "unban",
      description: "Unbans a user from all Discords",
      guildOnly: true,
      hidden: true,
      args: [
        {
          type: "user",
          prompt: "What is the User?",
          key: "target"
        },
        {
          type: "string",
          prompt: "What is the reason for un ultra banning this user?",
          key: "reason",
          default: "No Reason Provided"
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
  async run(msgObject, { target, reason }) {
    msgObject.reply(
      `Coolio :joy::joy:! Let's unban em' from everything! :gun:`
    );
    this.client.guilds.forEach(m => {
      m.unban(target.id, `"${reason}" - ${msgObject.author.tag}`);
        const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${msgObject.member} has Un-Universal Banned ${target}`);
     log.setFooter(
      `Mayflower Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`824608781458604042`).send(log);
    });
    msgObject.channel.send(
      `Unbanned ${target.tag} in all the servers :triumph::relieved:! All done!`
      
    );
  }
};
