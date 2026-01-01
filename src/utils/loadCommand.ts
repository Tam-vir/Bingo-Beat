import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function loadCommand(commandName: string) {
  const commandPath = join(
    __dirname,
    "../src/commands",
    `${commandName}/command.ts`
  );

  if (!fs.existsSync(commandPath)) {
    console.error(`Command ${commandName} not found at ${commandPath}`);
    return null;
  }

  // Use dynamic import instead of require for ES modules
  try {
    const commandModule = await import(`file://${commandPath}`);
    return commandModule.default;
  } catch (error) {
    console.error(`Error loading command ${commandName}:`, error);
    return null;
  }
}

// Load all commands and return a collection
export async function loadAllCommands() {
  const commandsDir = join(__dirname, "../src/commands");

  if (!fs.existsSync(commandsDir)) {
    console.error(`Commands directory not found at ${commandsDir}`);
    return {};
  }

  const commandFolders = fs.readdirSync(commandsDir);
  const commands: { [key: string]: any } = {};

  for (const folder of commandFolders) {
    const command = await loadCommand(folder);
    if (command) {
      commands[command.name] = command;
    }
  }

  return commands;
}
