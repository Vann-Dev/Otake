const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'dm',
    description: '',
    usage: '',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: true
}

module.exports.execute = async(bot, msg, args, data) => {
  
const rep = args[0];
const member = bot.users.cache.get(rep);

let bug = args.slice(1).join(' ');
if (!rep) return msg.channel.send({
        embed: {
          color: 'RED',
          description: 'Format <id> <problem>'
        }});


  const problemEmbed = new Discord.MessageEmbed()
  .setTitle('Thanks for reporting')
  .addField('Developer', msg.author.toString(), true)    
  .addField('Problem Report', bug)    
  .setThumbnail(bot.user.displayAvatarURL({ dynamic: true}))
  .setTimestamp()
  .setFooter(`${bot.user.username} Developer`)
  member.send(problemEmbed).catch(e=>{
          return msg.channel.send("**Dms are disabled**")
        })

  msg.react('👍')
  


}