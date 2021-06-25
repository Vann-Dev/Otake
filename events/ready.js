const Discord = require("discord.js");
const { WebhookClient, MessageEmbed } = require("discord.js");

module.exports = async(bot, msg) => {
    try {
        setInterval(() => {
      const statuses = [
        `@Otake | ${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} users`,
        `@Otake | ${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} users`
      ]

      const status = statuses[Math.floor(Math.random() * statuses.length)]
      bot.user.setActivity(status, { type: "LISTENING"})
    }, 15000)


        bot.logger.ready(bot.user.tag + ' Siap Keliling');
    } catch (err) {
        bot.logger.error('Ready event error - ' + err);
    }
    const webhookID = '847463279436496917'
    const webhookToken = 'cewNV9QKW-1fSkkqwAsEF5gUMCFAPhxfRV7aaHC85ZvLE-E9YZiUb47Pc0JWZiXmZq1z'

    const WebhookC = new WebhookClient(webhookID, webhookToken)

    const problemEmbed = new Discord.MessageEmbed()
      .setTitle('Ready Event')
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true}))
      .setDescription(`${bot.user.tag} online !!!`) 
      .setTimestamp()

  
};
