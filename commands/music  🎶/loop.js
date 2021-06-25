const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'loop',
    description: '',
    usage: '',
    aliases: ['repeat'],
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
      let mode = bot.distube.setRepeatMode(msg, parseInt(args[0]));
      mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
      const embed = new MessageEmbed()
        .setDescription("Set repeat mode to `" + mode + "`");
      msg.channel.send(embed).then(msg => msg.delete({timeout: 60000}));
}