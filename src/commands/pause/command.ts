import { ChannelType, Message } from "discord.js";
import type { Command } from "../../types/Command.ts";
const pauseCommand: Command = {
  name: "pause",
  description: "Pause the currently playing song.",
  execute: async (message: Message, args: string[]) => {
    const query = args.join(" ");
    if (message.channel.isTextBased() && (message.channel.type === ChannelType.GuildText || message.channel.type === ChannelType.GuildVoice)) {
      if (!message.member?.voice.channel) {
        message.channel.send(
          "You need to be in a voice channel to play music."
        );
        return;
      }
      // Logic to pause the currently playing song goes here
      message.channel.send(`Pausing the currently playing song.`);
    }
  },
};
export default pauseCommand;

