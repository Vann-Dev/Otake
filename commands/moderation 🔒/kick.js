const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'kick',
    description: 'kick a member',
    usage: 'name user',
    aliases: [],
    permissions: ['KICK_MEMBERS'],
    botPermissions: ['KICK_MEMBERS'],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
        const mentionedMember = msg.mentions.members.first() || msg.guild.members.cache.get(args[0])

        if(!msg.member.hasPermission('KICK_MEMBERS')) {
            const kickerror = new MessageEmbed()
            .setDescription("You Don\'t Have Permissions To Kick Members")
            .setColor('RED')

            return msg.channel.send(kickerror)
        } else if(!msg.guild.me.hasPermission('KICK_MEMBERS')) {
            const kickerror2 = new MessageEmbed()
            .setDescription("I Don\'t Have Permissions To Kick Members. Make Sure You Have Given Me Appropriate Permissions")
            .setColor('RED')

            return msg.channel.send(kickerror2)
        } else if (!mentionedMember) {
            const kickerror3 = new MessageEmbed()
            .setDescription("You Need To Mentioned a Member That You Want to Kick")
            .setColor('RED')

            return msg.channel.send(kickerror3)
        }

        const mentionedPosition = mentionedMember.roles.highest.position
        const memberPosition = msg.member.roles.highest.position
        const botPosition = msg.guild.me.roles.highest.position

        if(memberPosition <= mentionedPosition) {  
            const kickerr = new MessageEmbed()
            .setDescription("You Can Not Kick This Member Because their role is higher/equal to yours")
            .setColor('RED')
            
            return msg.channel.send(kickerr)
        } else if (botPosition <= mentionedPosition) {
            const kickerr2 = new MessageEmbed()
            .setDescription("I Can Not Kick This Member Because their role is higher/equal to mine")
            .setColor('RED')

            return msg.channel.send(kickerr2)
        }

        const reason = args.slice(1).join(' ')

        try {
            await mentionedMember.kick([reason])

            const kickSuccess = new MessageEmbed()
            .setTitle('Successful!')
            .setDescription(`Kicked ${mentionedMember} ${reason ? `for **${reason}**` : ''}`)
            

            msg.channel.send(kickSuccess)

        } catch (error) {
            console.log(error)
            const errorEmbed = new MessageEmbed()
            .setDescription("There Was an Unexpected Error Kicking This Member")
            .setColor('RED')
            
            msg.channel.send(errorEmbed)
        }
    }















