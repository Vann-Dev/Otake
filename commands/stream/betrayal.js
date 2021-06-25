const { MessageEmbed } = require("discord.js");
const disbut = require('discord-buttons');

module.exports = {
    name: 'betrayal',
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
  let prefix = !data.guild.prefix ? bot.config.prefix : data.guild.prefix;

    const channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[0]);
    if (!channel || channel.type !== "voice") return msg.channel.send(new MessageEmbed()
     .setDescription(`Please give me \`Voice Channel ID\`\nExample : \`${prefix}betrayal 798095524365336596\``)
     .setColor('RED')
    );
    if (!channel.permissionsFor(msg.guild.me).has("CREATE_INSTANT_INVITE")) return msg.channel.send(new MessageEmbed()
        .setDescription(`Please give me \`CREATE_INSTANT_INVITE permission\``)
        .setColor('RED')
    );

    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: "773336526917861400", // youtube together
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${bot.token}`,
            "Content-Type": "application/json"
        }
    })

    
        .then(res => res.json())
        .then(invite => {
            if (invite.error || !invite.code) return msg.channel.send(new MessageEmbed()
                .setDescription('Could not start **Betrayal**')
                .setColor('RED')
            );
    const linkyt = new MessageEmbed()
        .setTitle(`🎮 Betrayal`)
        .setDescription(`Requested By : ${msg.author.tag}`)
        .setThumbnail(msg.author.displayAvatarURL({ dynamic: true}))
        .setFooter('This message will auto delete after 60 Minutes')
        .setTimestamp()
        
    let inviteyt = new disbut.MessageButton()
          .setStyle('url') //default: blurple
          .setLabel('🎮 Click here to play') //default: NO_LABEL_PROVIDED
          .setURL(`https://discord.gg/${invite.code}`)
           const linkyt2 = msg.channel.send({
                buttons: [
                  inviteyt
                ],
                embed: linkyt
              }).then(linkyt => linkyt.delete({timeout: 3600000}));
        })
        .catch(e => {
            msg.channel.send(new MessageEmbed()
            .setDescription('Could not start **Betrayal**')
            .setColor('RED')
        );
        })
        msg.react('🗑️')
    const filter = (reaction, user) =>
        ["🗑️"].includes(reaction.emoji.name) && msg.author.id === user.id;
      const collector = msg.createReactionCollector(filter, { time: 3600000 });
  
      collector.on("collect", async (reaction, user) => {
        try {
          if (reaction.emoji.name === "🗑️") {
            msg.delete()
          } 
        } catch (error) {
          console.error(error);
          return msg.channel.send(error.msg).catch(console.error);
        }
      });
    }