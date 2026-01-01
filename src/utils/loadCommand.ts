import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import type { Command } from "../types/Command.ts";

/**
 * Dynamically load a single command by folder name
 */
export async function loadCommand(
  commandName: string
): Promise<Command | null> {
  const commandPath = join(
    __dirname,
    "../commands",
    `${commandName}/command.ts`
  );

  if (!fs.existsSync(commandPath)) {
    console.error(`Command ${commandName} not found at ${commandPath}`);
    return null;
  }

  try {
    const commandModule = await import(`file://${commandPath}`);
    return commandModule.default as Command;
  } catch (error) {
    console.error(`Error loading command ${commandName}:`, error);
    return null;
  }
}

/**
 * Dynamically load all commands in the commands directory
 */
export async function loadAllCommands(): Promise<{ [key: string]: Command }> {
  const commandsDir = join(__dirname, "../commands");

  if (!fs.existsSync(commandsDir)) {
    console.error(`Commands directory not found at ${commandsDir}`);
    return {};
  }

  const commandFolders = fs.readdirSync(commandsDir);
  const commands: { [key: string]: Command } = {};

  for (const folder of commandFolders) {
    const command = await loadCommand(folder);
    if (command && command.name) {
      commands[command.name] = command;
    }
  }

  return commands;
}
