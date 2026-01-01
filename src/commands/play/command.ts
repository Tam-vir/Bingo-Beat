import { ChannelType, Message } from "discord.js";
import type { Command } from "../../types/Command.ts";
const playCommand: Command = {
  name: "play",
  description: "Play a song from a given URL or search term.",
  execute: async (message: Message, args: string[]) => {
    const query = args.join(" ");
    console.log(`Play command invoked with query: ${query}`);
    if (message.channel.isTextBased() && (message.channel.type === ChannelType.GuildText || message.channel.type === ChannelType.GuildVoice)) {
      console.log("User is in a text channel, proceeding with play command.");
      if (!message.member?.voice.channel) {
        message.channel.send(
          "You need to be in a voice channel to play music."
        );
        return;
      }
      if (!query) {
        message.channel.send(
          "Please provide a URL or search term to play a song."
        );
        return;
      }
      // Logic to play the song goes here
      message.channel.send(`Playing song for query: ${query}`);
    }
  },
};
export default playCommand;
