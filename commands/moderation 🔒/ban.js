const { MessageEmbed } = require("discord.js")

const userReg = RegExp(/<@!?(\d+)>/)

module.exports = {
    name: 'ban',
    description: 'ban a member',
    usage: 'name user',
    aliases: [],
    permissions: ['BAN_MEMBERS'],
    botPermissions: ['BAN_MEMBERS'],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
        const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : [0]
        const mentionedUser = await msg.client.users.fetch(userID).catch(() => null)

        if(!msg.member.hasPermission('BAN_MEMBERS')) {
            const banerror = new MessageEmbed()
            .setDescription("You Don\'t Have Permissions To Ban Members")
            .setColor('RED')

            return msg.channel.send(banerror)
        } else if(!msg.guild.me.hasPermission('BAN_MEMBERS')) {
            const banerror2 = new MessageEmbed()
            .setDescription("I Don\'t Have Permissions To Ban Members. Make Sure You Have Given Me Appropriate Permissions")
            .setColor('RED')

            return msg.channel.send(banerror2)
        } else if(!mentionedUser) {
            const banerror3 = new MessageEmbed()
            .setDescription("You Need To Mention a Member to Ban")
            .setColor('RED')

            return msg.channel.send(banerror3)
        }

        const allBans = await msg.guild.fetchBans()

        if(allBans.get(mentionedUser.id)) {
            const banerr = new MessageEmbed()
            .setDescription("The User is Already Banned")
            .setColor('RED')

            return msg.channel.send(banerr)
        }

        const mentionedMember = msg.guild.members.cache.get(mentionedUser.id)

        if(mentionedMember) {
            const mentionedPosition = mentionedMember.roles.highest.position
            const memberPosition = msg.member.roles.highest.position
            const botPosition = msg.guild.me.roles.highest.position

            if(memberPosition <= mentionedPosition) {
                const banerr2 = new MessageEmbed()
            .setDescription("You Can Not Ban This Member Because their role is higher/equal to yours")
            .setColor('RED')

            return msg.channel.send(banerr2)
            } else if (botPosition <= mentionedPosition) {
                const banerr3 = new MessageEmbed()
            .setDescription("I Can Not Ban This Member Because their role is higher/equal to mine")
            .setColor('RED')

            return msg.channel.send(banerr3)
            }
        }

        const reason = args.slice(1).join(' ')

        msg.guild.members.ban(mentionedUser.id, {reason: reason})

        const banSuccess = new MessageEmbed()
        .setTitle('Success!')
        .setDescription(`Banned ${mentionedUser} ${reason ? `for **${reason}**` : ''}`)

        msg.channel.send(banSuccess)

        
     }
