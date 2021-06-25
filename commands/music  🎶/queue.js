const { MessageEmbed } = require("discord.js")
const { toColonNotation } = require("colon-notation")

module.exports = {
    name: 'queue',
    description: '',
    usage: '',
    aliases: ['q'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
  if (!bot.distube.getQueue(msg)) return msg.channel.send({
        embed: {
          color:'RED',
          description: 'No **Music** currently playing'
        }});
      if (!msg.member.voice.channel) return msg.channel.send({
        embed: {
          color: 'RED',
          description: 'You are not in **Voice Channel** !!!'
        }});
      if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send({
        embed: {
          color: 'RED',
          description: 'You are not in the same voice channel with Otake'
        }});
    let queue = bot.distube.getQueue(msg)
    

    let currentPage = 0;
    const embeds = generateQueueEmbed(msg, queue.songs);

    const queueEmbed = await msg.channel.send(
      `**Current Page - ${currentPage + 1}/${embeds.length}**`,
      embeds[currentPage]
    );

    try {
      await queueEmbed.react("⬅️");
      await queueEmbed.react("➡️");
    } catch (error) {
      console.error(error);
      msg.channel.send(error.msg).catch(console.error);
    }

    const filter = (reaction, user) =>
      ["⬅️", "➡️"].includes(reaction.emoji.name) && msg.author.id === user.id;
    const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });

    collector.on("collect", async (reaction, user) => {
      try {
        if (reaction.emoji.name === "➡️") {
          if (currentPage < embeds.length - 1) {
            currentPage++;
            queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
          }
        } else if (reaction.emoji.name === "⬅️") {
          if (currentPage !== 0) {
            --currentPage;
            queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
          }
        } else {
          collector.stop();
          reaction.msg.reactions.removeAll();
        }
        await reaction.users.remove(msg.author.id);
      } catch (error) {
        console.error(error);
        return msg.channel.send(error.msg).catch(console.error);
      }
    });
  
    
function generateQueueEmbed(msg, queue) {
  let embeds = [];
  let k = 10;

  for (let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;
    
    const info = current.map((track) => `**${++j -1}.** [${track.name}](${track.url}) - \`${track.formattedDuration}\``).slice(1).join("\n");
    
    const embed = new MessageEmbed()
      .setAuthor("Queue", msg.author.displayAvatarURL({dynamic: true}))
      .setDescription(`**Current Song - [${queue[0].name}](${queue[0].url})**\n\n${info}`)
      .setTimestamp()
    embeds.push(embed);
  }

  return embeds;
}
}
