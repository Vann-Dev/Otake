const canvacord = require('canvacord/src/Canvacord');
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'affect',
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
        const member = msg.mentions.users.first() || msg.author;
        const memberAvatar = member.displayAvatarURL({ dynamic: false, format: 'png' })

        const image = await canvacord.affect(memberAvatar)
        const affect = new MessageAttachment(image, 'affect.png')
        return msg.channel.send(affect)
    }
