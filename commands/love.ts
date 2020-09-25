import { Bot,CommandModel } from '../models';
import { CommandHelp } from '../models/CommandModel';
const LoveCommand = new CommandModel('love');
LoveCommand.run = async (client:Bot, message, args) => {
    message.delete();
    message.channel.send(`I love you ${args[1]} :heart:`)
};
LoveCommand.help = new CommandHelp().setDescription(`$prefix$love @member`)
export default LoveCommand;
