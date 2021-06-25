const { MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'slow',
    description: 'slow a channel',
    usage: 'time',
    aliases: ['slowmode'],
    permissions: ['MANAGE_CHANNELS'],
    botPermissions: ['MANAGE_CHANNELS'],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
        if (!msg.member.hasPermission(('MANAGE_CHANNELS'))) {
            const slowmodeError = new MessageEmbed()
                .setDescription(`You do not have permissions to enable/disable slowmode.`)
                .setColor('RED')
            return msg.channel.send(slowmodeError)
        }
        if (!args[0]) {
            const slowmodeError2 = new MessageEmbed()
                .setDescription(`You did not provide a time. \n\n Time Units - h(hour), m(minute), s(seconds) \n (Example - .slowmode 5s)`)
                .setColor('RED')
            return msg.channel.send(slowmodeError2)
        }
        const currentSlowmode = msg.channel.rateLimitPerUser
        const reason = args[1] ? args.slice(1).join(" ") : 'Not Specified'

        if (args[0] === 'off') {
            if (currentSlowmode === 0) {
                const slowmodeOfferror = new MessageEmbed()
                    .setDescription(`Slowmode is already off`)
                    .setColor('RED')
                return msg.channel.send(slowmodeOfferror)
            }
            msg.channel.setRateLimitPerUser(0, reason)
            const slowmodeOff = new MessageEmbed()
                .setDescription(`Slowmode Disabled`)
                

            return msg.channel.send(slowmodeOff)
        }

        const time = ms(args[0]) / 1000
        const slowmodeError3 = new MessageEmbed()
            .setDescription(`This is not a valid time. Please write the time in the units mentioned. \n\n Time Units - h(hour), m(minute), s(seconds) \n (Example - .slowmode 5s)`)
            .setColor('RED')
        if (isNaN(time)) {
            return msg.channel.send(slowmodeError3)
        }

        if (time > 21600000) {
            const slowmodeError4 = new MessageEmbed()
                .setDescription(`Time is too high. Make sure its below 6 hours.`)
                .setColor('RED')

            return msg.channel.send(slowmodeError4)
        }

        if (currentSlowmode === time) {
            const slowmodeError5 = new MessageEmbed()
                .setDescription(`Slowmode is already set to ${args[0]}`)
                .setColor('RED')
            return msg.channel.send(slowmodeError5)
        }
        
        let slowmode = await msg.channel.setRateLimitPerUser(time, reason)
        let afterSlowmode = msg.channel.rateLimitPerUser
        if(afterSlowmode > 0) {
            const embed = new MessageEmbed()
            .setTitle(`Slowmode Enabled`)
            .addField(`Slowmode Duration`, args[0])
            .addField(`Reason`, reason)
            
            
            return msg.channel.send(embed)
        } else if(afterSlowmode === 0) {
            return msg.channel.send(slowmodeError3)
        }
    }
    

