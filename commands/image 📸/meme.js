const randomGen = require("andoi-image-api");

module.exports = {
    name: 'meme',
    description: 'send random meme photo',
    usage: '',
    aliases: ['mem'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 1000,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
      msg.channel.send(await randomGen.meme());
    }
