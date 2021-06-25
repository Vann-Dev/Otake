const Discord = require("discord.js");
const prettyMilliseconds = require("pretty-ms");
const { MessageEmbed } = require("discord.js")
const { version } = require("discord.js");
const os = require("os");

module.exports = {
    name: 'stat',
    description: '',
    usage: '',
    aliases: ['stats'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
  
  

  const embed = new Discord.MessageEmbed()
  .setTitle('Bot Stats')
  .setThumbnail(bot.user.displayAvatarURL({ dynamic: true}))
  .addField('Server Stats',`\`\`\`Total Member  =>  ${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\nTotal Guild =>  ${bot.guilds.cache.size}\nTotal Channel =>  ${bot.channels.cache.size}\`\`\`` )
  .addField('Bot Stats', `\`\`\`Uptime  =>  ${prettyMilliseconds(bot.uptime)}\nMemory Usage =>  ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\nDiscordjs Version =>  v${version}\nNode Version  =>  ${process.version}\nHost OS => ${os.type()} ${os.release()} (${os.arch()})\`\`\``)   
  .setTimestamp()
  .setFooter(`${bot.user.username} Stats`)
  
  const statEmbed = await msg.channel.send(embed);
    statEmbed.react('🗑️')

    const filter = (reaction, user) =>
        ["🗑️"].includes(reaction.emoji.name) && msg.author.id === user.id;
      const collector = statEmbed.createReactionCollector(filter, { time: 60000 });
  
      collector.on("collect", async (reaction, user) => {
        try {
          if (reaction.emoji.name === "🗑️") {
              statEmbed.delete();   
          }        
        } catch (error) {
          console.error(error);
          return msg.channel.send(error.msg).catch(console.error);
        }
      });
}