const Canvacord = require("canvacord/src/Canvacord");
const { MessageAttachment } = require("discord.js");

module.exports = {
    name: 'facepalm',
    description: '',
    usage: '',
    aliases: ['fp'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {

        let mentionedMember = msg.mentions.users.first();
        if(!mentionedMember) mentionedMember = msg.author
        let avatar = mentionedMember.displayAvatarURL({ dynamic: false, format: 'png' })     

        let image = await Canvacord.facepalm(avatar)
        let facepalm = new MessageAttachment(image, 'facepalm.png')

        msg.channel.send(facepalm)
    }
