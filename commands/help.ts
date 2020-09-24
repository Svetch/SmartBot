import { Message } from 'discord.js';
import { Bot } from '../models';
import CommandModel, { CommandHelp } from '../models/CommandModel';
const HelloCommand = new CommandModel('help');
HelloCommand.run = async (client, message, args) => {
    message.channel.send(`${client.commands.map(command=>command.help).filter(help=>help&&help.desciption != null).map(x=>x.desciption).join(' ')}`);
};
HelloCommand.isValid = async (client:Bot,message:Message,args:Array<string>) => {
    return message.guild != null;
};
HelloCommand.on('invalid',(client:Bot,message:Message,args:Array<string>)=>{
    console.log('invalid');
    
    message.channel.send('You can\'t use this command in DM!');
});
HelloCommand.help = new CommandHelp().setDescription("Idk");
HelloCommand.config.aliases = ["h","holp"];
export default HelloCommand;
