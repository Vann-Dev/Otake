const translate = require('@k3rn31p4nic/google-translate-api')
const { MessageEmbed } = require('discord.js')
const { languages } = require("@k3rn31p4nic/google-translate-api")

module.exports = {
    name: 'translate',
    description: 'translate text',
    usage: 'text',
    aliases: ['tra'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
        const ErrorEmbed  = new MessageEmbed()
        .setDescription("Example - .translate <language> <text>")
        .setColor("RED")

        if(!args[0]) return msg.channel.send(ErrorEmbed)
        await translate(args.slice(1).join(" "), { to: args[0]}).then((result) => {
            const embed = new MessageEmbed()
            .setTitle('Translation')
            .setDescription(result.text)
            

            return msg.channel.send(embed)
        }).catch(error => {
            const translateError = new MessageEmbed()
            .setDescription(error)
            .setColor("RED")

            return msg.channel.send(translateError)
        })
    }
