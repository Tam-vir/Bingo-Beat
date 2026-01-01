import { readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function loadAllEvents(): Promise<{ [key: string]: Function }> {
  const eventsDir = join(__dirname, "../events");
  const eventFiles = readdirSync(eventsDir).filter(
    (file) => file.endsWith(".ts") || file.endsWith(".js")
  );

  const events: { [key: string]: Function } = {};

  for (const file of eventFiles) {
    const eventPath = join(eventsDir, file);
    try {
      const eventModule = await import(`file://${eventPath}`);
      const eventName = file.split(".")[0];
      events[eventName] = eventModule.default;
    } catch (error) {
      console.error(`Error loading event ${file}:`, error);
    }
  }
  return events;
}
