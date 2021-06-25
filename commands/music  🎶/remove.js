const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'remove',
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
    const queue = bot.distube.getQueue(msg);

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
       
        if (args[0] > queue.songs.length - 1) return msg.channel.send(new MessageEmbed()
            .setDescription('Invalid queue number')
            .setColor('RED')
        )
 
     if(isNaN(args[0])) {
        const seekError3 = new MessageEmbed()
        .setDescription('Please Enter a Valid Number')
        .setColor("RED")
        return msg.channel.send(seekError3)
    }
 
     const song = queue.songs.splice(args[0], 1);
     msg.channel.send(new MessageEmbed()
        .setDescription('Song removed from queue')
     );
 }