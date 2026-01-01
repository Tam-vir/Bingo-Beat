import { ChannelType, Message } from "discord.js";
import { Command } from "../../types/Commands.ts";
const playCommand: Command = {
  name: "play",
  description: "Play a song from a given URL or search term.",
  execute: async (message: Message, args: string[]) => {
    const query = args.join(" ");
    if (message.channel.type === ChannelType.GuildText ) {
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
