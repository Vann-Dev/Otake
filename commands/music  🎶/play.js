const { MessageEmbed } = require("discord.js");

const { getTracks, getPreview } = require("spotify-url-info")
module.exports = {
    name: 'p',
    description: '',
    usage: '',
    aliases: ['play'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    if (!msg.member.voice.channel) return msg.channel.send({
        embed: {
          color: 'RED',
          description: 'You are not in **Voice Channel** !!!'
        }});
      if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send({
        embed: {
          color: 'RED',
          description: 'You are not in the same voice channel with Otake'
        }});
      if (!args[0]) return msg.channel.send({
        embed: {
          color: 'RED',
          description: 'Please indicate **Title** of the song !!!'
        }});
      bot.distube.play(msg, args.join(" "));
      msg.react('<:oke:850246083870982184>');
      msg.channel.send(`**Searching on** <:google:850245630643404811>`).then(msg => msg.delete({timeout: 5000}));
    
  }
