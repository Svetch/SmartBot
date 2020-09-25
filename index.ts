import { loadCommands } from './utils';
import * as mongoose from 'mongoose';
import { Bot } from './models';
import * as dotenv from 'dotenv';
import { existsSync } from 'fs';
import Sound, { IUserSound } from './models/mongodb/Sound';
import { Document, Model, model, Types, Schema, Query } from "mongoose";
dotenv.config();
const { env } = process;
const bot = new Bot({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

mongoose.connect(`mongodb+srv://${env.MONGODB_USER}:${env.MONGODB_PASS}@${env.MONGODB_HOST}/${env.MONGODB_DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
bot.client.login(env.DISCORD_TOKEN);
loadCommands(bot);
bot.client.on('message', async (message) => {
    const messageArray = message.content.split(' ');

    const command = messageArray[0] = (env.BOT_PREFIXTYPE == 'argument') ? messageArray[1] : messageArray[0].slice(bot.prefix.length);
    const args = env.BOT_PREFIXTYPE == 'argument' ? messageArray.slice(1) : messageArray;
    if (!(!env.BOT_COMMAND_SENSITIVE ? message.content.toLowerCase() : message.content).startsWith(bot.prefix)) return;
    const commandfile = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));


    if (!commandfile) return bot.commands.get('help').run(bot, message, args);

    if (await commandfile.isValid(bot, message, args))
        commandfile.run(bot, message, args);
    else
        commandfile.emit('invalid', bot, message, args);

});
bot.client.on("voiceStateUpdate", async (oldState, newState) => {
    const filePath = `./assets/${newState.id}.mp3`;
    if (!existsSync(filePath)) return;

    if ((!oldState||!oldState.channel)&&newState && newState.channel) {
        const sound = await Sound.findOne({
            owner: newState.id
        });

        if (sound && sound.enabled) {
            const { channel } = newState;
            const connection = await channel.join();
            connection.voice.serverDeaf = false;
            const playing = connection.play(filePath);
            playing.on("finish", finish => channel.leave());
        }
    }
});
bot.client.on('ready', async () => {
    console.log('Bot is ready!');
    console.log(await bot.client.generateInvite());
});