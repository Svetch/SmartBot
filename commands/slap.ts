import { Bot,CommandModel } from '../models';
import { CommandHelp } from '../models/CommandModel';
const Command = new CommandModel('slap');
Command.run = async (client:Bot, message, args) => {
    message.delete();
    message.channel.send(`Hay you ${args[1]}`)
};
Command.help = new CommandHelp().setDescription(`$prefix$slap @member`)
export default Command;
