const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons');
const disbut = require('discord-buttons');

module.exports = {
    name: 'invite',
    description: 'invite the bot',
    usage: 'invite',
    aliases: ['inv'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
      let button = new disbut.MessageButton()
          .setStyle('url') //default: blurple
          .setLabel('📭 Invite 📭') //default: NO_LABEL_PROVIDED
          .setURL('https://discord.com/oauth2/authorize?client_id=833259432003502120&scope=bot&permissions=439565438') //note: if you use the style "url" you must provide url using .setURL('https://example.com')

        await msg.channel.send('Click here to Invite', button);
    }
