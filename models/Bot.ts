import { Client, ClientOptions, Collection } from 'discord.js';
import CommandModel from './CommandModel';
const { env } = process;
export default class Bot{
    constructor(options?:ClientOptions){
        this.client = new Client(options);
        this.commands = new Collection<string, CommandModel>();
        this.aliases = new Collection<string, string>();
        this.prefix = !env.BOT_PREFIX_SENSITIVE ? env.bot_prefix.toLowerCase() : env.bot_prefix;
    }
    commands: Collection<string, CommandModel>;
    aliases: Collection<string, string>;
    client: Client;
    prefix: string;
}