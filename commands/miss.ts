import { Bot,CommandModel } from '../models';
import { CommandHelp } from '../models/CommandModel';
const Command = new CommandModel('miss');
Command.run = async (client:Bot, message, args) => {
    message.delete();
    message.channel.send(`I miss you ${args[1]} :heart:`)
};
Command.help = new CommandHelp().setDescription(`$prefix$miss @member`)
export default Command;
