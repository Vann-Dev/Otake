const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'avatar',
    description: 'get member avatar',
    usage: 'username',
    aliases: ['ava'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    //Start

    let Member = msg.mentions.users.first() || msg.guild.member(args[0]) || msg.author;

    let embed = new Discord.MessageEmbed()
      .addField(
        "Links",
        `[Png](${Member.displayAvatarURL({
          format: "png",
          dynamic: true
        })}) | [Jpg](${Member.displayAvatarURL({
          format: "jpg",
          dynamic: true
        })}) | [Webp](${Member.displayAvatarURL({
          format: "webp",
          dynamic: true
        })})`
      )
      .setImage(Member.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    msg.channel.send(embed);

    //End
  }
