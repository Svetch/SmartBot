import { loadCommands } from './utils';
import * as mongoose from 'mongoose';
import { Bot } from './models';
import * as dotenv from 'dotenv';
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
    if (message.author.bot) return;
    const messageArray = message.content.split(' ');

    const command = messageArray[0] = (env.BOT_PREFIXTYPE == 'argument') ? messageArray[1] : messageArray[0].slice(bot.prefix.length);

    const args = env.BOT_PREFIXTYPE == 'argument' ? messageArray.slice(1) : messageArray;
    if ((!env.BOT_PREFIX_SENSITIVE ? message.content.toLowerCase() : message.content).startsWith(bot.prefix)) return;
    const commandfile = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
    console.log(command);
    if (!commandfile) return bot.commands.get('help').run(bot, message, args);

    if (await commandfile.isValid(bot, message, args))
        commandfile.run(bot, message, args);
    else
        commandfile.emit('invalid', bot, message, args);

});
bot.client.on('ready', () => {
    console.log('Bot is ready!');

});