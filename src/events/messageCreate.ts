import { ChannelType, Client, Collection, Message } from "discord.js";
import { Command } from "../types/Command.ts";

export default async function messageCreateEvent(
    client: Client,
    message: Message,
    commands: Collection<string, Command>,
) {
    if (message.author.bot) return;
    if (!message.content.startsWith(client.prefix)) return;
    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();
    if (!commandName) return;
    const command = commands.get(commandName);
    if (!command) return;
    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(`Error executing command ${commandName}:`, error);
        if (message.channel.type === ChannelType.GuildText) {
            message.channel.send("There was an error executing that command.");
        }
    }
}

