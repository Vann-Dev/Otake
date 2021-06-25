const { MessageEmbed } = require("discord.js")
const { setFilter } = require('distube')

module.exports = {
    name: 'filter',
    description: '',
    usage: '',
    aliases: ['filters'],
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
        let filterOption = args[0];
        if (!args[0]) {
            const filterOptions = new MessageEmbed()
                .setTitle(`**Filter Options:**`)
                .setDescription(`\`3d, bassboost, echo, karaoke, nightcore, vaporwave\``)

            return msg.channel.send(filterOptions)
        }

        try {
            await bot.distube.setFilter(msg, filterOption)
                const embed = new MessageEmbed()
                    .setDescription('Music Filter has been set to: ' + `${filterOption}` || 'Off')
    
                return msg.channel.send(embed)
        } catch (error) {
            return;
        }
}
