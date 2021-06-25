const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons');
const disbut = require('discord-buttons');

module.exports = {
    name: 'vote',
    description: 'vote the bot',
    usage: 'vote',
    aliases: ['v'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}
module.exports.execute = async(bot, msg, args, data) => {
      let button = new disbut.MessageButton()
          .setStyle('url') //default: blurple
          .setLabel('📧 Vote 📧') //default: NO_LABEL_PROVIDED
          .setURL('https://top.gg/bot/833259432003502120/vote') //note: if you use the style "url" you must provide url using .setURL('https://example.com')

        await msg.channel.send('Click here to vote', button);

    }
