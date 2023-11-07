// Const

const http = require("http");
const express = require("express");
const app = express();
const Discord = require("discord.js");
const commando = require("discord.js-commando");
const request = require("request-promise");
``;
const path = require("path");
const config = require(path.join(__dirname, "config", "config.json"));
const oneLine = require("common-tags").oneLine;

// Client
const client = new commando.CommandoClient({
  owner: ["459726631435632640", "568502003462963219"],
  commandPrefix: ";",
  unknownCommandResponse: true,
  selfbot: false,
  commandEditableDuration: 60
});

const constant = require("discord.js/src/util/Constants.js");
constant.DefaultOptions.ws.properties.$browser = `Discord iOS`;

// Status
client.once("ready", () => {
  client.user.setPresence({
    game: { name: "With Cleo!" }
  });
});

// CONSOLE LOGGERS FOR ANY ERRORS ETC
client
  .on("error", console.error)
  .on("warn", console.warn)
  .on("debug", console.log)
  .on("ready", () => {
    console.log(
      `Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`
    );
  })
  .on("disconnect", () => {
    console.warn("Disconnected!");
  })
  .on("reconnecting", () => {
    console.warn("Reconnecting...");
  })
  .on("commandError", (cmd, err) => {
    if (err instanceof commando.FriendlyError) return;
    console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
  })
  .on("commandBlocked", (msg, reason) => {
    console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ""}
			blocked; ${reason}
		`);
  })
  .on("commandPrefixChange", (guild, prefix) => {
    console.log(oneLine`
			Prefix ${prefix === "" ? "removed" : `changed to ${prefix || "the default"}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
		`);
  })
  .on("commandStatusChange", (guild, command, enabled) => {
    console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? "enabled" : "disabled"}
			${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
		`);
  })
  .on("groupStatusChange", (guild, group, enabled) => {
    console.log(oneLine`
			Group ${group.id}
			${enabled ? "enabled" : "disabled"}
			${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
		`);
  });

// Registrys
client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["mod", "Moderation Commands"],
    ["misc", "Miscellaneous Commands"],
    ["administrator", "Administrator Commands"],
    ["es", "ES commands"],
    ["icf", "ICF commands"]
  ])

  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, "commands"));

// Client Login
client.login(config.token);
