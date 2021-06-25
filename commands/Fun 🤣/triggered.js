const canvacord = require('canvacord');
const Canvacord = require('canvacord/src/Canvacord');
const {  MessageAttachment } = require('discord.js');

module.exports = {
    name: 'triggered',
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
        let avatar = msg.author.displayAvatarURL({dynamic: false, format: "png"})

        let image = await Canvacord.trigger(avatar)

        let triggered = new MessageAttachment(image, "triggered.gif")

        msg.channel.send(triggered)
    }
