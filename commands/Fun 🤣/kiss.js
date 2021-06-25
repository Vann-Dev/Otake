const Canvacord = require("canvacord/src/Canvacord")
const { MessageAttachment } = require("discord.js")

module.exports = {
    name: 'kiss',
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
        if (!args[0]) return msg.channel.send({
        embed: {
          color: 'RED',
          description: 'Please tag someone'
        }});
        const member = msg.mentions.users.first()
        const mentionedMemberAvatar = member.displayAvatarURL({dynamic: false, format: "png"})
        const messageAuthorAvatar = msg.author.displayAvatarURL({dynamic: false, format: "png"})

        let image = await Canvacord.kiss(mentionedMemberAvatar, messageAuthorAvatar)

        let kiss = new MessageAttachment(image, "kiss.png")

        msg.channel.send(kiss)

    }
