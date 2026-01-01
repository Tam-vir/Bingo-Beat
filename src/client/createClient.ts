import {
  Client,
  Collection,
  GatewayIntentBits,
  ClientEvents,
} from "discord.js";
import { loadAllCommands } from "../utils/loadCommand.ts";
import { loadAllEvents } from "../utils/loadEvents.ts";
import { Command } from "../types/Command.ts";
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

export function createClient() {
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
  const commands = loadAllCommands();
  for (const command of Object.values(commands)) {
    if (command && command.name) {
      client.commands.set(command.name, command);
    }
  }

  // Load events
  const events = loadAllEvents();
  for (const [eventName, listener] of Object.entries(events)) {
    // Cast to any to bypass TypeScript strictness or use proper typing
    client.on(
      eventName as keyof ClientEvents,
      listener as (...args: any[]) => void
    );
  }

  return client;
}
