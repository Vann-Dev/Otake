const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'save',
    description: '',
    usage: '',
    aliases: ['grab'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
  let guildDB = await bot.data.getGuildDB(msg.guild.id);
  let prefix = !guildDB.prefix ? bot.config.prefix : guildDB.prefix;
  let queue = bot.distube.getQueue(msg);
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
      if (!bot.distube.getQueue(msg)) return msg.channel.send({
        embed: {
          color:'RED',
          description: 'No **Music** currently playing'
        }});
      const song = queue.songs[0];
      const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
      const left = song.duration - seek;
      msg.author.send(new MessageEmbed()
      .setAuthor(`Saved Song`, bot.user.displayAvatarURL({
        dynamic: true
      }))
      .setThumbnail(song.thumbnail)
      .setURL(song.url)
      .setTitle(`**${song.name}**`)
      .addField(`⌛ Duration: `, `\`${song.formattedDuration}\``, true)
      .addField(`🎵 Views: `, `\`${song.views}\``, true)
      .addField(`▶ Play it:`, `\`${prefix}play ${song.url}\``)
      .addField(`🔎 Saved in:`, `${msg.channel}`)
      .setFooter(`Requested by: ${song.user.tag} | Guild: ${msg.guild.name}`, song.user.displayAvatarURL({
        dynamic: true
      }))
        ).catch(e=>{
          return msg.channel.send("**:x: Your DMs are disabled**")
        })    
}