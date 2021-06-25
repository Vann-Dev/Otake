const HMfull = require("hmfull");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'anime',
    description: 'send random anime photo',
    usage: '',
    aliases: ['anim','ranime'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 1000,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    const res = await HMfull.Freaker.sfw.anime()
    msg.channel.send(res.url);
  
}

