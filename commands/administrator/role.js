const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class id extends Command {
  constructor(client) {
    super(client, {
      name: "role",
      aliases: ["giverole"],
      group: "administrator",
      memberName: "role",
      description: "Grants a member a specified role.",
      guildOnly: true,
      args: [
        {
          type: "member",
          prompt: "What member do you want to role?",
          key: "member"
        },
        {
          type: "role",
          prompt: "What role would you like to grant this member?",
          key: "role"
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
  async run(msgObject, { member, role }) {
    let GuildMember = msgObject.guild.members.find(`id`, member.id);
    if (!GuildMember.roles.has(role.id)) {
      GuildMember.addRole(role.id);
      msgObject.reply(
        "Modified roles for " + member.user.tag + " | + " + role.name
      );
    } else {
      GuildMember.removeRole(role.id);
      msgObject.reply(
        "Modified roles for " + member.user.tag + " | - " + role.name
      );
    }
  }
};
