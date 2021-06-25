const { MessageEmbed } = require('discord.js')
const fetch  = require('node-fetch')

module.exports = {
    name: 'compliment',
    description: '',
    usage: '',
    aliases: ['comp'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {

        const { compliment } = await fetch("https://complimentr.com/api").then((res) => res.json())

        const embed = new MessageEmbed()
        .setDescription(compliment)

        msg.channel.send(embed)
    }
