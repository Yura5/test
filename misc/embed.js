const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class EmbedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'embed',
            group: 'misc',
            memberName: 'embed',
            description: 'Embeds the text you provide.',
            examples: ['embed Embeds are cool.'],
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like the bot to embed?',
                    type: 'string'
                }
            ]
        });    
    }
hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.get("822802858415226892");
    if (msgObject.guild.id == 822802858415226892) {
      if (msgObject.member.roles.find(role => role.id === "459726631435632640")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("459726631435632640")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.id == "822802858751033363")) {
        return true;
      }
    }
    return "Sorry 😣! You must be an Admin!";
  }
     run(msg, args) {
        const { text } = args;
        const embed = new RichEmbed()
            .setDescription(text)
            .setAuthor(msg.author.username, msg.author.displayAvatarURL)
            .setColor(0x00AE86)
            .setTimestamp();
        return msg.embed(embed);
    }
};
