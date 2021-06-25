const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'seek',
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
        if(isNaN(args[0])) {
            const seekError3 = new MessageEmbed()
            .setDescription('Please Enter a Valid Number of second(s) to Seek!')
            .setColor("RED")
            return msg.channel.send(seekError3)
        }

        const seekAmount = args[0] * 1000 

        bot.distube.seek(msg, seekAmount)
        msg.react('<:oke:850246083870982184>')
    }
