const { MessageEmbed } = require('discord.js');
const answers = require('../../data/8ball.json')

module.exports = {
    name: '8ball',
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
        const question = args.join(" ")

        if(!question) {
            const eightBallError = new MessageEmbed()
            .setDescription('Please Provide a Question')
            .setColor('RED')
            return msg.channel.send(eightBallError)
        }
        const answer = answers[Math.floor(Math.random() * answers.length)];

        const embed = new MessageEmbed()
        .setTitle("8Ball")
        .addField(`Question:`, question)
        .addField(`Answer:`, answer);
        

        msg.channel.send(embed);
        
    }
