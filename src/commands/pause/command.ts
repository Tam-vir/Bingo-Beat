import { ChannelType, Message } from "discord.js";
import { Command } from "../../types/Commands.ts";
const pauseCommand: Command = {
  name: "pause",
  description: "Pause the currently playing song.",
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
      // Logic to pause the currently playing song goes here
      message.channel.send(`Pausing the currently playing song.`);
    }
  },
};
export default pauseCommand;

