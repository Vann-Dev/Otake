const Discord = require('discord.js');

module.exports = {
    name: 'qrcode',
    description: '',
    usage: '',
    aliases: ['qr'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    
        let link = (args[0])
        let qrlink = `http://api.qrserver.com/v1/create-qr-code/?data=${link}&size=200x200`

        if (!link) 
        return msg.channel.send(`Please provide a link !!`)

        if (require('is-url')(link)) {
            const attachment = new Discord.MessageAttachment(qrlink, 'qrcode.png');

            const embed = new Discord.MessageEmbed()
            .setTitle('There you go')
            .attachFiles(attachment)
            .setImage('attachment://qrcode.png')
            .setFooter(`Requested by ${msg.author.username}`,  msg.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

            msg.channel.send(embed)

        } else {
            msg.reply(`Error provide a valid link which contain \`https://\``)
        }

    }
