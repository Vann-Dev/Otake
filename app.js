/* includes */
const Discord = require('discord.js');
const DisTube = require('distube');
const fs = require('fs');
const util = require('util');
const mongoose = require('mongoose');
const createBar = require("string-progressbar");
const solenolyrics= require("solenolyrics"); 
const Genius = require("genius-lyrics");
const Client = new Genius.Client("_kftxS-_dLdCxF7z7JvsazwoAD5PX_RLD44OCD4PgRddZmVrbW0xi88huxhzvHzr");

/* defines & config */
const bot = new Discord.Client();
const readdir = util.promisify(fs.readdir);
const { MessageEmbed } = require('discord.js');
const disbut = require('discord-buttons')(bot);
const webhookID = ''
const webhookToken = ''
const { WebhookClient } = require("discord.js");

const WebhookC = new WebhookClient(webhookID, webhookToken)
const SpotifyPlugin = require("@distube/spotify")
const SoundCloudPlugin = require("@distube/soundcloud")


bot.events = new Discord.Collection();
bot.commands = new Discord.Collection();
bot.data = require('./database/MongoDB.js');
bot.logger = require('./helpers/logger.js');
bot.tools = require('./helpers/tools.js');
bot.config = require('./config.json');
bot.distube = new DisTube(bot, { searchSongs: 0, emitNewSongOnly: true, leaveOnStop: false, leaveOnEmpty: true, youtubeDL: true, leaveOnFinish: false, youtubeCookie: null, plugins: [new SpotifyPlugin({ parallel: true }), new SoundCloudPlugin()], nsfw: true, updateYouTubeDL: true});


bot.distube.on("initQueue", queue => {
    queue.autoplay = false;
    queue.volume = 100;
});
bot.distube.on("empty", queue => queue.textChannel.send({
    embed: {
      color: 'RED',
      description: 'Voice Channel **Empty**, Leaving Voice Channel !!! ✋'
    },
  }));
bot.distube.on("finish", queue => queue.textChannel.send({
    embed: {
      color: 'RED',
      description: 'No More Song In Queue !!! ✋'
    },
  }));


const status = (queue) => `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "Server Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

bot.distube.on("playSong", (queue, song) => queue.textChannel.send(new MessageEmbed()
    .setTitle('<:playing:850244271705686027> Playing')
    .setDescription(`[${song.name}](${song.url})`)
    .addField("⏰ Duration", `\`${song.formattedDuration}\``)
    .setThumbnail(song.thumbnail)
    .setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
    ).then(msg => msg.delete({timeout: 180000})));

bot.distube.on("addSong", (queue, song) => queue.textChannel.send(new MessageEmbed()
    .setTitle('<:playing:850244271705686027> Added')
    .setDescription(`[${song.name}](${song.url})`)
    .addField("⏰ Duration", `\`${song.formattedDuration}\``)
    .setThumbnail(song.thumbnail)
    .setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
    ).then(msg => msg.delete({timeout: 30000})));

bot.distube.on("addList", (queue, playlist) => queue.textChannel.send(new MessageEmbed()
    .setTitle('<:playlist:850243996714532944> Playlist Added')
    .setDescription(`${playlist.name}`)
    .addField("⏰ Total Duration", `\`${playlist.formattedDuration}\``)
    .addField('🎵 Total Songs', `\`${playlist.songs.length}\``)
    .setTimestamp()
    ).then(msg => msg.delete({timeout: 30000})));

bot.distube.on("error", (channel, error) => channel.send(new MessageEmbed()
    .setColor('RED')
    .setDescription('Something error...')).then(msg => msg.delete({timeout: 30000}))

        );


async function initialize() {
    // load events
    let events = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
    for(let e of events) {
        let eventFile = require('./events/' + e);
        let eventName = e.split('.')[0];
        bot.logger.event(eventName + ' loaded.');
        bot.on(eventName, eventFile.bind(null, bot));
    }

    // load commands
    let categories = await readdir('./commands/');
    categories.forEach(c => {
        let commands = fs.readdirSync('./commands/' + c + '/').filter(file => (file.endsWith('.js')));
        for(const file of commands) {
            let commandFile = require('./commands/' + c + '/' + file);
            bot.commands.set(commandFile.name, commandFile);
        }
        bot.logger.cmd(c + ' - ' + commands.length + ' commands loaded.');
    });

    // init database
    mongoose.connect(bot.config.mongo, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        bot.logger.log('MongoDB connected.');
    }).catch((err) => {
        bot.logger.error('MongoDB error - ' + err);
    });




    // login bot
    bot.login(bot.config.token)
}

initialize();
