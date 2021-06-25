const weather = require('weather-js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'weather',
    description: 'get weather info',
    usage: 'location',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
        const ErrorEmbed  = new MessageEmbed()
        .setDescription("You Need To Specify A Location")
        .setColor("RED")

        weather.find({search: args.join(" "), degreeType: 'C'}, function(error, result) {
            if(error) return msg.channel.send(error)
            if(!args[0]) return msg.channel.send(ErrorEmbed)

            if( result === undefined || result.lenght === 0) return msg.channel.send("**Invalid Location**")
            var current = result[0].current;
            var location = result[0].location;

            const weatherInfo = new MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather Report For ${current.observationpoint}`)
            .setImage(current.imageUrl)
            .addField("Timezone" , `UTC${location.timezone}`, true)
            .addField("Degree Type" , "Celcius", true)
            .addField("Temperature", `${current.temperature}` , true)
            .addField('Wind', `${current.winddisplay}` , true)
            .addField('Feels Like', `${current.feelslike}`, true)
            .addField('Humidity', `${current.humidity}` , true)


            msg.channel.send(weatherInfo)
        })
    }
