import {readdir} from 'fs';
import { Bot } from '../models';

function loadCommands(bot:Bot) {
    readdir('commands/', async (err, files) => {

        if (err) console.log(err);

        const jsfile = files.filter(f => f.endsWith('ts'));
        if (jsfile.length <= 0) {
            return console.log('Bot Couldn\'t Find Commands in commands Folder.');
        }

        jsfile.forEach(async (f, i) => {
            const command = (await import(`../commands/${f}`)).default;
            bot.commands.set(command.name, command);
            command.config.aliases.forEach(alias => {
                bot.aliases.set(alias, command.name);
            });
            console.log(`${i + 1}.) ${command.name} command is loaded!`);
            if (i == jsfile.length - 1) console.log('Commands are loaded!');
        });



    });
}

export default loadCommands;