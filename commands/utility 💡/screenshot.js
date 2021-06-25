const { Message, MessageEmbed } = require("discord.js");

const Discord = require("discord.js");

const moment = require("moment");
const fetch = require("node-fetch");

const url = require("url");

module.exports = {
    name: 'screenshot',
    description: 'get screenshot from url',
    usage: 'url',
    aliases: ['ss'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
if (!msg.channel.nsfw) return msg.channel.send({
        embed: {
          color: 'RED',
          description: 'Due to approval from Discord, this command cannot be used on non-NSFW channels'
        }});

    const user = msg.author.tag
    const urls = args[0];
    if (!urls)
      return msg.channel
        .send(`${user},where is the link ?`)
        .then(m => m.delete({ timeout: 5000 }).catch(e => {}));
    if (urls.length < 8)
      return msg
        .reply(
          "your link is too short to reach - 8 limit"
        )
        .then(m => m.delete({ timeout: 9000 }).catch(e => {}));
    msg.react('👍');
    const site = /^(https?:\/\/)/i.test(urls) ? urls : `http://${urls}`;
    try {
      const { body } = await fetch(
        `https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`
      );

      return msg.channel.send(
        `Here is a screenshot from requested URL`,
        {
          files: [{ attachment: body, name: "Screenshot.png" }]
        }
      );
    } catch (err) {
      if (err.status === 404)
        return msg.channel
          .send("Could not find any results. Invalid URL?")
          .then(m => m.delete({ timeout: 14000 }).catch(e => {}));
      return msg
        .reply(`Oh no, an error occurred: \`${err.msg}\`. Try again later!`)
        .then(m => m.delete({ timeout: 13000 }).catch(e => {}));
    }
  }
