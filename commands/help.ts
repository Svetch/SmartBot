import { Message, MessageEmbed } from 'discord.js';
import { Bot } from '../models';
import CommandModel, { CommandHelp } from '../models/CommandModel';
const HelloCommand = new CommandModel('help');
HelloCommand.run = async (client, message, args) => {
    let embed = new MessageEmbed();
    await Promise.all(client.commands.map(command => {
        if (command.help && command.help.desciption)
            embed.addField(command.name, command.help.desciption.replace('$prefix$', client.prefix + (process.env.BOT_PREFIXTYPE == "argument" ? " " : '')));
    }));
    message.channel.send(`<@${message.author.id}>`, { embed });
    message.delete();
};
HelloCommand.isValid = async (client: Bot, message: Message, args: Array<string>) => {
    return true;
};
HelloCommand.on('invalid', (client: Bot, message: Message, args: Array<string>) => {
    message.channel.send('You can\'t use this command in DM!');
});
HelloCommand.config.aliases = ["h", "holp"];
export default HelloCommand;
