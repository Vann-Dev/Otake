const Canvacord = require("canvacord/src/Canvacord")
const { MessageAttachment } = require("discord.js")

module.exports = {
    name: 'changemymind',
    description: '',
    usage: '',
    aliases: ['cmm'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
        let text = args.join(" ")

        let image =  await Canvacord.changemymind(text)

        let ChangeMyMind = new MessageAttachment(image, "cmm.png")

        msg.channel.send(ChangeMyMind)
    }
