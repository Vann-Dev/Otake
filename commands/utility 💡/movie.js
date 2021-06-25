const discord = require("discord.js");
const imdb = require("imdb-api");

module.exports = {
    name: 'movie',
    description: 'get movie info',
    usage: 'title',
    aliases: ['mov'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    
    if(!args.length) {
      return msg.channel.send({
        embed: {
          color:'RED',
          description: 'Please give **Title** of movie'
        }})
    }
    
    const imob = new imdb.Client({apiKey: "5e36f0db"})
    
    let movie = await imob.get({'name': args.join(" ")}).catch(e=>{
          return msg.channel.send("I dont know what is that, so i will send this...")
        })

    let embed = new discord.MessageEmbed()
    .setTitle(movie.title)
    .setThumbnail(movie.poster)
    .setDescription(movie.plot)
    .setFooter(`Ratings: ${movie.rating}`)
    .addField("Country", movie.country, true)
    .addField("Languages", movie.languages, true)
    .addField("Type", movie.type, true);
    
    
    
    msg.channel.send(embed)
    
    
    
  }

