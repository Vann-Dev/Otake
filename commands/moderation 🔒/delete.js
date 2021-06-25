const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'delete',
    description: 'delete message',
    usage: 'message',
    aliases: ['del','purge'],
    permissions: ['MANAGE_MESSAGES'],
    botPermissions: ['MANAGE_MESSAGES'],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
        if (!msg.member.permissions.has("MANAGE_MESSAGES"))
            return msg.channel.send(`You Do Not Have Permissions To Use This Command, ${msg.author.username}`);

        if (!args[0]) {
            return msg.channel.send({
        embed: {
          color: 'RED',
          description: 'Please Enter An Amount Between 1 and 100 !!!'
        }
        })
            }
        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;

        } else {
            deleteAmount = parseInt(args[0]);
        }

        await msg.channel.bulkDelete(deleteAmount, true);

        const embed = new MessageEmbed()
            .setDescription(`Successfully Deleted ${deleteAmount} Messages`)
            
            

        await msg.channel.send(embed).then(msg => msg.delete({timeout: 5000}))

    }
