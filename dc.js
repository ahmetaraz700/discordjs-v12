/* Identification */
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const fs = require('fs');
const data = require('quick.db');
const express = require('express');
const app = express();

let prefix = ayarlar.prefix;

/* Listens */
app.get("/", (req, res) => {
  res.send("Giriş yapıldı!");
});

/* Event Loader */
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`${eventName} is loaded for events.`);
    client.on(eventName, event.bind(null, client));
  });
});

/* Commands Loader */
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./komutlar/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let cmd = require(`./komutlar/${file}`);
    let cmdFileName = file.split(".")[0];
    client.commands.set(cmd.help.name, cmd);
    console.log(`${cmdFileName} is loaded.`);
    if (cmd.help.aliases) {
      cmd.help.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
    };
  });
});

/* Ready */
client.on("ready", () => {
  console.log(`${Client.user.tag} aktif.`);
  client.user.setActivity(`${prefix}yardım`);
  client.user.setStatus(`idle`)
});

/* Login */
client.login(ayarlar.token);

/* ------------------------------------------------------------------------------ */
/* Commands in Main File */
client.on("message", message => {
  if (message.content.toLowerCase() === 'hi') return message.reply(`${message.author.username} Hi!`)
});

//->...
