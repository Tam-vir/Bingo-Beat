import { ChannelType, Message } from "discord.js";
import { Command } from "../../types/Command.ts";
const stopCommand: Command = {
  name: "stop",
  description: "Stop the currently playing song.",
  execute: async (message: Message, args: string[]) => {
    const query = args.join(" ");
    if (message.channel.type === ChannelType.GuildText) {
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
      // Logic to stop the currently playing song goes here
      message.channel.send(`Stopping the currently playing song.`);
    }
  },
};
export default stopCommand;
