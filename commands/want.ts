import { Bot,CommandModel } from '../models';
import { CommandHelp } from '../models/CommandModel';
const Command = new CommandModel('want');
Command.run = async (client:Bot, message, args) => {
    message.delete();
    message.channel.send(`I want to ${args[1]} you ${args[2]}`)
};
Command.help = new CommandHelp().setDescription(`$prefix$want \`what you want\` @member`)
export default Command;