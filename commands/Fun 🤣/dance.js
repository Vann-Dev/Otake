const HMfull = require("hmfull");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'dance',
    description: '',
    usage: '',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    const res = await HMfull.Miss.sfw.dance()
    msg.channel.send(res.url);
  
}

