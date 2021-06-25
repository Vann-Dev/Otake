const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'wouldyourather',
    description: '',
    usage: '',
    aliases: ['wyr'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {

        const replies = require('../../data/wouldyourather.json')
        const reply = replies[Math.floor(Math.random() * replies.length)]

        const embed = new MessageEmbed()
        .setTitle('Would you rather?')
        .setDescription(reply)

        msg.channel.send(embed)

    }
