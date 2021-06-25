const { MessageEmbed } = require("discord.js")
const solenolyrics= require("solenolyrics"); 

module.exports = {
    name: 'lyrics',
    description: '',
    usage: '',
    aliases: ['ly','lyric'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
  if (!msg.member.voice.channel) return msg.channel.send({
        embed: {
          color: 'RED',
          description: 'You are not in **Voice Channel** !!!'
        }});
      if (!bot.distube.getQueue(msg)) return msg.channel.send({
        embed: {
          color:'RED',
          description: 'No **Music** currently playing'
        }});
      if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send({
        embed: {
          color: 'RED',
          description: 'You are not in the same voice channel with Otake'
        }});
      const searching = await msg.channel.send(`Searching lyric...`)
      let queue = bot.distube.getQueue(msg);
      const song = queue.songs[0];
      const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
      const left = song.duration - seek;

      var lyrics = await solenolyrics.requestLyricsFor(song.name) 
      if (!lyrics) lyrics = `No lyrics found for ${song.name} :(`;
      const lyricsEmbed = new MessageEmbed()
      .setTitle(`Lyrics For ${song.name}`)
      .setDescription(lyrics)
      .setTimestamp()
      .setFooter('Wanna change appearance? type this command again')
      
      if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
      
    await msg.channel.send(lyricsEmbed)
            searching.delete()
}