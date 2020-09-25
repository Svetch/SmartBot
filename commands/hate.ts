import { Bot,CommandModel } from '../models';
import { CommandHelp } from '../models/CommandModel';
const HateCommand = new CommandModel('hate');
HateCommand.run = async (client:Bot, message, args) => {
    message.delete();
    message.channel.send(`I hate you ${args[1]} :broken_heart:`)
};
HateCommand.help = new CommandHelp().setDescription(`$prefix$hate @member`)
export default HateCommand;
