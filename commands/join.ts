import { existsSync } from 'fs';
import { Bot, CommandModel } from '../models';
import { CommandHelp } from '../models/CommandModel';
import Sound from '../models/mongodb/Sound';
import { UserResolvable } from 'discord.js';
const Command = new CommandModel('join');
Command.run = async (client: Bot, message, args) => {

    message.delete().catch(e => { });
    const filePath = `./assets/${message.author.id}.mp3`;
    if (!existsSync(filePath)) return message.channel.send("I cant find your sound!");
    const sound = await Sound.findOne({
        owner: message.author.id
    });
    switch (args[1]) {
        case 'disable':
            if (sound) {
                await Sound.updateOne({
                    owner: message.author.id
                }, { enabled: false });
                message.channel.send("Sound effect is disabled!");
            }
            else
                message.channel.send("Sound effect is already disabled!");
            break;
        case 'enable':
            if (sound)
                await Sound.updateOne({
                    owner: message.author.id
                }, { enabled: true });
            else new Sound({
                owner: message.author.id,
                enabled: true
            }).save();
            message.channel.send("Sound effect is enabled!");
            break;
        case 'status':
            const status = await Sound.findOne({
                owner: message.author.id
            });
            message.channel.send(`Sound is ${status.enabled ? 'enabled' : 'disabled'}!`);
            break;
        default:
            if (args[1]) {
                // message.guild.members.resolve(new UserResolvable())
            }

            const { channel } = message.member.voice;

            if (!channel) return message.channel.send("I cant find you!");

            const connection = await channel.join();
            connection.voice.serverDeaf = false;
            const playing = connection.play(filePath);
            playing.on("finish", finish => channel.leave());
            break;
    }
};
Command.help = new CommandHelp().setDescription(`$prefix$join ?{enable | disable | status}\n
enable: Enable the join sound effect
disable: Disable the join sound effect
status: Get the join sound effect status (disabled  or enabled)
empty: Play join sound in connected voice channel`)
export default Command;
