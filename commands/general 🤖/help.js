const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);
const { MessageButton } = require('discord-buttons');
const disbut = require('discord-buttons');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'help',
    description: 'Lists bot commands.',
    usage: 'help',
    aliases: ['commands', 'cmds'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let prefix = !data.guild.prefix ? bot.config.prefix : data.guild.prefix;
    
    const infobot = new MessageEmbed()
            .setAuthor(bot.user.username,bot.user.displayAvatarURL({ dynamic: true, size: 2048}))
            .setDescription('[**Otake**](https://top.gg/bot/833259432003502120) is a **Multipurpose** bot that is very easy to use, has features that can be obtained for free.')
            .addField('❓ What\'s New?', '```1.Added seek,pause,resume command\n2.Support spotify\n3.Now you can watch youtube together with your friend\n4.Play game with your friend```')
            .addField('🤖 Commands List', '```🤖 General Commands\n🤣 Fun Commands\n📸 Image Commands\n🎶 Music Commands\n💡 Utility Commands\n🔒 Moderation Commands\n🎮 Stream & Game Commands```')
            .setFooter('React to the reaction to see commmands')

    const generalCMD = new MessageEmbed()
            .setAuthor(bot.user.username,bot.user.displayAvatarURL({ dynamic: true, size: 2048}))
            .setDescription('[**Otake**](https://top.gg/bot/833259432003502120) is a **Multipurpose** bot that is very easy to use, has features that can be obtained for free.')
            .addField('🤖 General Commands', '```help => show this page\ninvite => send link to invite Otake\nping => see Otake latency\nsupport => send support message\nvote => send link to vote Otake\nstats => see bot statistic```')

    const funCMD = new MessageEmbed()
            .setAuthor(bot.user.username,bot.user.displayAvatarURL({ dynamic: true, size: 2048}))
            .setDescription('[**Otake**](https://top.gg/bot/833259432003502120) is a **Multipurpose** bot that is very easy to use, has features that can be obtained for free.')
            .addField('🤣 Fun Commands', '```8ball => answer a question\ncompliment => say something\ndance => lets dance\nkiss => i like you <3\nshit => you sh*t\nslap => slap someone u hate\ntriggered => ArrrGgh\nwouldyourather => would you?```')

    const imageCMD = new MessageEmbed()
            .setAuthor(bot.user.username,bot.user.displayAvatarURL({ dynamic: true, size: 2048}))
            .setDescription('[**Otake**](https://top.gg/bot/833259432003502120) is a **Multipurpose** bot that is very easy to use, has features that can be obtained for free.')
            .addField('📸 Image Commands', '```affect => idk what is this\nanime => who like random anime picture?\nbeautiful => this is beautiful\ncmm => can u change my mind?\nfacepalm => fp\nmeme => u know random meme?```')

    const musicCMD = new MessageEmbed()
            .setAuthor(bot.user.username,bot.user.displayAvatarURL({ dynamic: true, size: 2048}))
            .setDescription('[**Otake**](https://top.gg/bot/833259432003502120) is a **Multipurpose** bot that is very easy to use, has features that can be obtained for free.')
            .addField('🎶 Music Commands', '```play => play a song from url or youtube or spotify\nclear => clear queue\njoin => join voice channel\njump => jump to choosen track\nleave => leave the voice channel\nlofi => play lofi hiphop\nloop => loop song or queue\nlyrics => get the song lyrics\nnp => show curret song\nplayskip => skip the current song than play your requested song\nqueue => show the queue\nreplay => replay the current song\nsave => save the current song to your dm\nshuffle => shuffle the queue\nskip => skip the song\nsong => playing random music song\nstop => stop the music\nseek => seek song\npause => pause song\nresume => resume song```')

    const utilityCMD = new MessageEmbed()
            .setAuthor(bot.user.username,bot.user.displayAvatarURL({ dynamic: true, size: 2048}))
            .setDescription('[**Otake**](https://top.gg/bot/833259432003502120) is a **Multipurpose** bot that is very easy to use, has features that can be obtained for free.')
            .addField('💡 Utility Commands', '```avatar => show avatar\nmorse => translate text into morse code\nmovie => show movie stats\nqrcode => change url to qrcode\nscreenshot => screenshot url you send\nserver => get server information\ntranslate => translate text into another language\nuser => get user information\nweather => get weather information```')

    const moderationCMD = new MessageEmbed()
            .setAuthor(bot.user.username,bot.user.displayAvatarURL({ dynamic: true, size: 2048}))
            .setDescription('[**Otake**](https://top.gg/bot/833259432003502120) is a **Multipurpose** bot that is very easy to use, has features that can be obtained for free.')
            .addField('🔒 Moderation Commands', '```ban => ban someone u tag\ndelete => delete message\nkick => kick someone u tag\nprefix => change server prefix\nslow => set slow mode at channel```')
    const gameCMD = new MessageEmbed()
            .setAuthor(bot.user.username,bot.user.displayAvatarURL({ dynamic: true, size: 2048}))
            .setDescription('[**Otake**](https://top.gg/bot/833259432003502120) is a **Multipurpose** bot that is very easy to use, has features that can be obtained for free.')
            .addField('🎮 Stream & Game Commands', '```youtube => watch youtube together at voice channel\nbetrayal => play adventure game with your friend```')

    const firstHelp = await msg.channel.send(infobot);
        firstHelp.react("🤖");
        firstHelp.react("🤣");
        firstHelp.react("📸");
        firstHelp.react("🎶");
        firstHelp.react("💡");
        firstHelp.react("🔒");
        firstHelp.react("🎮");

    const filter = (reaction, user) =>
        ["🤖", "🤣","📸","🎶", "💡","🔒","🎮"].includes(reaction.emoji.name) && msg.author.id === user.id;
      const collector = firstHelp.createReactionCollector(filter, { time: 60000 });
  
      collector.on("collect", async (reaction, user) => {
        try {
          if (reaction.emoji.name === "🤖") {
              firstHelp.edit(generalCMD);   
          } 

          if (reaction.emoji.name === "🤣") {
              firstHelp.edit(funCMD);   
          } 

          if (reaction.emoji.name === "📸") {
              firstHelp.edit(imageCMD);   
          } 

          if (reaction.emoji.name === "🎶") {
              firstHelp.edit(musicCMD);   
          } 

          if (reaction.emoji.name === "💡") {
              firstHelp.edit(utilityCMD);   
          } 

          if (reaction.emoji.name === "🔒") {
              firstHelp.edit(moderationCMD);   
          } 

          if (reaction.emoji.name === "🎮") {
              firstHelp.edit(gameCMD);   
          } 
          await reaction.users.remove(msg.author.id);
        } catch (error) {
          console.error(error);
          return msg.channel.send(error.msg).catch(console.error);
        }
      });
    }
