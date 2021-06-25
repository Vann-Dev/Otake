const { MessageEmbed } = require('discord.js');

const moment = require('moment');

const filterLevels = {

	DISABLED: 'Off',

	MEMBERS_WITHOUT_ROLES: 'No Role',

	ALL_MEMBERS: 'Everyone'

};

const verificationLevels = {

	NONE: 'None',

	LOW: 'Low',

	MEDIUM: 'Medium',

	HIGH: 'High',

	VERY_HIGH: 'Very High'

};

const regions = {

	brazil: 'Brazil',

	europe: 'Europe',

	hongkong: 'Hong Kong',

	india: 'India',

	japan: 'Japan',

	russia: 'Russia',

	singapore: 'Singapore',

	southafrica: 'South Africa',

	sydeny: 'Sydeny',

	'us-central': 'US Central',

	'us-east': 'US East',

	'us-west': 'US West',

	'us-south': 'US South'

};

module.exports = {
    name: 'server',
    description: 'get server info',
    usage: '',
    aliases: ['serverinfo'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {

		const roles = msg.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());

		const members = msg.guild.members.cache;

		const channels = msg.guild.channels.cache;

		const emojis = msg.guild.emojis.cache;

		const embed = new MessageEmbed()

			.setDescription(`**Guild information for __${msg.guild.name}__**`)

			.setThumbnail(msg.guild.iconURL({ dynamic: true }))

			.addField('General', [

				`**❯ Name:** ${msg.guild.name}`,

				`**❯ ID:** ${msg.guild.id}`,

				`**❯ Owner:** ${msg.guild.owner.user.tag} (${msg.guild.ownerID})`,

				`**❯ Region:** ${regions[msg.guild.region]}`,

				`**❯ Boost Tier:** ${msg.guild.premiumTier ? `Tier ${msg.guild.premiumTier}` : 'None'}`,

				`**❯ Explicit Filter:** ${filterLevels[msg.guild.explicitContentFilter]}`,

				`**❯ Verification Level:** ${verificationLevels[msg.guild.verificationLevel]}`,

				`**❯ Time Created:** ${moment(msg.guild.createdTimestamp).format('LT')} ${moment(msg.guild.createdTimestamp).format('LL')} ${moment(msg.guild.createdTimestamp).fromNow()}`,

				'\u200b'

			])

			.addField('Statistics', [

				`**❯ Role Count:** ${roles.length}`,

				`**❯ Emoji Count:** ${emojis.size}`,

				`**❯ Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,

				`**❯ Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,

				`**❯ Member Count:** ${msg.guild.memberCount}`,


				`**❯ Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,

				`**❯ Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,

				`**❯ Boost Count:** ${msg.guild.premiumSubscriptionCount || '0'}`,

				'\u200b'

			])

			.setTimestamp();

		msg.channel.send(embed);

	}


