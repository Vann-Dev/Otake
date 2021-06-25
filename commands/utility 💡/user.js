const { MessageEmbed } = require("discord.js")
const moment = require("moment")

module.exports = {
    name: 'user',
    description: 'get user info',
    usage: 'name member',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {


    let user;

    if (!args[0]) {
      user = msg.member;
    } else {


   


      user = msg.mentions.members.first() || await msg.guild.members.fetch(args[0]).catch(err => { return msg.channel.send(":x: Unable to find this Person") })
    }

    if (!user) {
      return msg.channel.send(":x: Unable to find this person!")
    }


    //OPTIONS FOR STATUS

    

    //NOW BADGES
    let badges = await user.user.flags
    badges = await badges ? badges.toArray() : ["None"]

    let newbadges = [];
    badges.forEach(m => {
      newbadges.push(m.replace("_", " "))
    })

    let embed = new MessageEmbed()
      .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))

    

      //EMBED COLOR BASED ON member
      

      //OTHER STUFF 
      embed.setAuthor(user.user.tag, user.user.displayAvatarURL({ dynamic: true }))

      //CHECK IF USER HAVE NICKNAME
      if (user.nickname !== null) embed.addField("Nickname", user.nickname)
      embed.addField("Joined At", moment(user.joinedAt).format("LLLL"))
        .addField("Account Created At", moment(user.user.createdAt).format("LLLL"))
        .addField("Common Information", `ID: \`${user.user.id}\`\nDiscriminator: ${user.user.discriminator}\nBot: ${user.user.bot}\nDeleted User: ${user.deleted}`)
        .addField("Badges", newbadges.join(", ").toLowerCase() || "None")
        



      return msg.channel.send(embed).catch(err => {
        return msg.channel.send("Error : " + err)
      })



    }



  