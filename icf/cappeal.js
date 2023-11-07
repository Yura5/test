const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
const webhook = "wjdd"
module.exports = class whois extends Command {
  constructor(client) {
    super(client, {
      name: "cappeal",
      aliases: ["appeal"],
      group: "icf",
      memberName: "cappeal",
      ownerOnly: false,
      throttling: {
		usages: 1,
		duration: 20,
	},
      description: "Checks a user",
      args: [
        {
          type: "user",
          prompt: "What is the User?",
          key: "argUser",
        },
        {
          type: "string",
          prompt: "**Accept** or **decline**?",
          key: "Status"
        },
        {
            type: "string",
            prompt: "Reasoning for the appeal. You can put **none** for no reason.",
            key: "Reason"

        }
      ]
    });
  }
  async run(msgObject, { argUser, stat, reason }) {
    let made = new Date(argUser.createdTimestamp);
    let date = made.toDateString();
    let editMessage = await msgObject.reply("Fetching the user's data.");

    let editMsg = await msgObject.reply(
      "Checking if a roblox account is linked..."
    );
    
    let data = await request({
      uri: `https://verify.eryn.io/api/user/${argUser.id}`,
      json: true,
      simple: false
    });
    if (data.robloxUsername !== undefined) {
      editMsg.edit("A roblox account is linked! Fetching data... :brain:");
      let Data = await request({
        uri: `https://api.roblox.com/users/get-by-username?username=${data.robloxUsername}`,
        json: true,
        simple: false
      });
      const profileLink = `https://www.roblox.com/users/${data.robloxId}/profile`;
      const avatarURL = `https://assetgame.roblox.com/Thumbs/Avatar.ashx?username=${encodeURIComponent(
        data.robloxUsername
      )}`;
      let pastNames = "None";
      let joinDate = "Unknown";

    } else {
      editMsg.edit("A roblox account is not linked!:raised_hands: :raised_hands: ");
      editMsg.delete();
    }
  }
};
