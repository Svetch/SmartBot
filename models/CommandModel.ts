import { Message, MessageEmbed } from 'discord.js';
import { EventEmitter } from 'events';
import BotClient from './Bot';
class CommandModel extends EventEmitter {
    name: string;
    config = {
        aliases: []
    }
    help?: CommandHelp;
    constructor(name: string, options: any = {}) {
        super();
        if (!name) throw new Error('Name is required for command!');
        this.name = name;

        for (const key of Object.keys(options)) {
            const option = options[key];
            if (option) this.config[key] = option;
        }
    }
    run(client: BotClient, message: Message, args: Array<string>): Promise<any> { return new Promise(resolve => { }); }
    isValid(client: BotClient, message: Message, args: Array<string>): Promise<any> { return new Promise(resolve => { resolve(true)}); }

}

export default CommandModel;

export class CommandHelp {
    desciption?: string;
    embed?: MessageEmbed;
    setDescription(desc: string) { this.desciption = desc; return this;};
    setEmbed(embed: MessageEmbed) { this.embed = embed; return this;};
}