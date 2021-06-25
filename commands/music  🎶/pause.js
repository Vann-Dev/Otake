const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'pause',
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
        if(bot.distube.isPaused(msg)) {
            const pauseError3 = new MessageEmbed()
            .setDescription('The Music is Already Paused!')
            .setColor("RED")
            return msg.channel.send(pauseError3)
        }

        bot.distube.pause(msg)
        msg.react('<:pause:850246860622659604>')
    }
