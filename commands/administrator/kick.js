const Discord = require("discord.js")
const { Command } = require("discord.js-commando")

module.exports = class ban extends Command {
    constructor(client){
        super(client, {
            name: "kick",
            aliases: [],
            description: "Kicks someone from server",

            memberName: "kick",
            group: "administrator",
            guildOnly: true,

            args: [
                {
                    type: "member",
                    prompt: "who are you kicking?",
                    key: "person",
                },
                {
                    type: "string",
                    prompt: "why are you kicking them?",
                    key: "reason",
                },
            ]
        })
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
    async run(message, { person, reason }){
        message.guild.member(person).kivk(reason).then(() => {
            message.reply(`successfully kicked ${person.user.tag}`)
        }).catch(error => {
            message.reply(`failed to kick ${person.user.tag}\`\`\`js\n${error}\`\`\``)
            return
        })
         const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${message.member.displayName} has kick ${person} `);
      log.setFooter(
      `Mayflower Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg` // image
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`824608781458604042`).send(log); // the id is the channel id

    }
}
