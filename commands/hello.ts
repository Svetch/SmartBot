import { Bot,CommandModel } from '../models';
const HelloCommand = new CommandModel('hello');
HelloCommand.run = async (client:Bot, message, args) => {
    message.channel.send(`Hello <@${message.author.id}>!`);
};
export default HelloCommand;
