const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'join',
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
      if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send({
        embed: {
          color: 'RED',
          description: 'You are not in the same voice channel with Otake'
        }});
        const voiceChannel = msg.member.voice.channel

        try {
            await voiceChannel.join()
        } catch(error) {
            console.log(`There Was An Error Connecting To The Voice Channel: ${error}`)
            return msg.channel.send(`There Was An Error Connecting To The Voice Channel: ${error}`)
        }
    }
