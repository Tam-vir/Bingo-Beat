import {
  Client,
  Collection,
  GatewayIntentBits,
} from "discord.js";
import type { ClientEvents } from "discord.js";

import type { Command } from "../types/Command.ts";
// interface Command {
//   name: string;
//   description: string;
//   execute(message: Message, args: string[]): Promise<void>;
// }

declare module "discord.js" {
  interface Client {
    commands: Collection<string, Command>;
    prefix: string;
  }
}

export function createClient(
  events: Record<string, Function>,
  commands: { [key: string]: Command }
): Client {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.commands = new Collection<string, Command>();
  client.prefix = "!";

  // Load commands

  for (const command of Object.values(commands)) {
    if (command && command.name) {
      client.commands.set(command.name, command);
    }
  }

  for (const [eventName, listener] of Object.entries(events)) {
    // Cast to any to bypass TypeScript strictness or use proper typing
    // console.log(`Loaded event: ${eventName}`);
    client.on(
      eventName as keyof ClientEvents,
      listener as (...args: any[]) => void
    );
  }

  return client;
}
