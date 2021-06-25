const canvacord = require('canvacord');
const Canvacord = require('canvacord/src/Canvacord');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'shit',
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

        if(!member) {
            const shitError = new MessageEmbed()
            .setDescription(`You'll Need to mention a member, or do you wanna use the command on yourself? xD`)
            .setColor("RED")
            return msg.channel.send(shitError)
        }

        let image = await Canvacord.shit(mentionedMemberAvatar)

        let shit = new MessageAttachment(image, "shit.png")

        msg.channel.send(shit)
    }
