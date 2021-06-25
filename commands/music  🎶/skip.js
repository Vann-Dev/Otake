const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'skip',
    description: '',
    usage: '',
    aliases: ['s'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
  const queue = bot.distube.getQueue(msg);
  let prefix = !data.guild.prefix ? bot.config.prefix : data.guild.prefix;


      if (!msg.member.voice.channel) return msg.channel.send({
        embed: {
          color: 'RED',
          description: 'You are not in **Voice Channel** !!!'
        }});
      if (!bot.distube.getQueue(msg)) return msg.channel.send({
        embed: {
          color:'RED',
          description: 'No **Music** currently playing'
        }});
      if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send({
        embed: {
          color: 'RED',
          description: 'You are not in the same voice channel with Otake'
        }});
      
      try {bot.distube.skip(msg)} catch (err) {bot.distube.stop(msg)}
      msg.react('<:skip:850249138862948362>');
      
}