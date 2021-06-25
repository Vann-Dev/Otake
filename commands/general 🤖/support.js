const Discord = require("discord.js");
const { WebhookClient, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'support',
    description: '',
    usage: '',
    aliases: ['bugreport','bug'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
const webhookID = ''
const webhookToken = ''

const WebhookC = new WebhookClient(webhookID, webhookToken)
const bug = args.join(" ");
if (!bug) return msg.channel.send({
        embed: {
          color: 'RED',
          description: 'Please specify the problem'
        }});

msg.channel.send({
        embed: {
          description: 'Please wait until my developer reply'
        }}).then(msg => msg.delete({timeout: 5000}));
msg.react('👍')

  const problemEmbed = new Discord.MessageEmbed()
  .setTitle('Something Error')
  .setColor('RED')
  .addField('Author', msg.author.toString(), true)    
  .addField('Guild', msg.guild.name, true)    
  .addField('Problem', bug)    
  .setThumbnail(msg.author.displayAvatarURL({ dynamic: true}))
  .setTimestamp()

  WebhookC.send({
    username: msg.author.tag,
    avatarURL: msg.author.displayAvatarURL({ dynamic: true}),
    embeds: [problemEmbed]
  })


}
