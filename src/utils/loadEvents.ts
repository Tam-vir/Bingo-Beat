
import { readdirSync } from "fs";
import { join } from "path";

export function loadAllEvents(): { [key: string]: Function } {
  const eventsDir = join(__dirname, "../src/events");
  const eventFiles = readdirSync(eventsDir).filter((file) =>
    file.endsWith(".ts")
  );
  const events: { [key: string]: Function } = {};
    for (const file of eventFiles) {
    const eventPath = join(eventsDir, file);
    import(`file://${eventPath}`).then((eventModule) => {
      const eventName = file.split(".")[0];
      events[eventName] = eventModule.default;
    }).catch((error) => {
      console.error(`Error loading event ${file}:`, error);
    });
    }
    return events;
}