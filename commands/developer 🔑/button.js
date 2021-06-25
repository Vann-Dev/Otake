const { MessageButton } = require('discord-buttons');
const disbut = require('discord-buttons');
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'button',
    description: '',
    usage: '',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: true
}

module.exports.execute = async(bot, msg, args, data) => {
  

bot.on('clickButton', async (button) => {
  button.defer()
  if (button.id === 'my_custom_id') {
    button.channel.send(`${button.clicker.user.tag} clicked button!`);
  }
});

  let button = new disbut.MessageButton()
          .setStyle('link') //default: blurple
          .setLabel('My First Button!') //default: NO_LABEL_PROVIDED
          .setURL('https://www.youtube.com/') //note: if you use the style "url" you must provide url using .setURL('https://example.com')

        await msg.channel.send('This is a button', button);
    }
