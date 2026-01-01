import { ChannelType, Client, Message } from "discord.js";
import { json } from "node:stream/consumers";

export default async function messageCreateEvent(message: Message) {
  const client = message.client;
  const commands = client.commands; // already in Client

  if (!message.content.startsWith(client.prefix)) return;
  if (message.author.bot) return;
    if(message.channel.isTextBased() === false) return;
  const args = message.content.slice(client.prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();
  if (!commandName) return;

  const command = commands.get(commandName);
  if (!command) return;

  try {
    console.log(`Executing command: ${commandName} with args: ${args}`);
    await command.execute(message, args);
  } catch (error) {
    console.error(`Error executing command ${commandName}:`, error);
    if (message.channel.isTextBased() && (message.channel.type === ChannelType.GuildText || message.channel.type === ChannelType.GuildVoice)) {
      message.channel.send("There was an error executing that command.");
    }
  }
}
