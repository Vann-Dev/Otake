const { MessageEmbed } = require("discord.js")
const createBar = require("string-progressbar");
const { toColonNotation } = require("colon-notation")

module.exports = {
    name: 'np',
    description: '',
    usage: '',
    aliases: ['nowplay','nowplaying'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
      let queue = bot.distube.getQueue(msg);
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
      
      const track = queue.songs[0];
      const time = track.duration * 1000
      const currenttime = queue.currentTime
      const remaining = (time - currenttime) < 0 ? "◉ LIVE" : time - currenttime
      let nowPlaying = new MessageEmbed()
        .setAuthor("Now Playing")
        .setThumbnail(track.thumbnail)
        .setDescription(`**[${track.name}](${track.url})**`)
        .addField("Views", `\`${track.views}\``, true)
        .addField("Likes :thumbsup:", `\`${track.likes}\``, true)
        .addField("Dislikes :thumbsdown:", `\`${track.dislikes}\``, true)
        .addField("Requested By", track.user, true)
        .addField("Loop Mode", `\`${queue.repeatMode ? queue.repeatMode == 2 ? "Queue" : "Song" : "Off"}\``, true)
        .setTimestamp()
        .addField("Duration: ", `\`[${queue.formattedCurrentTime}/${track.formattedDuration}]\`\n` +
                `${time === 0 ? "" : ` Time remaining: \`${toColonNotation(remaining)}\``}`)
      
        

        return msg.channel.send(nowPlaying).then(msg => msg.delete({timeout: 60000}))
}