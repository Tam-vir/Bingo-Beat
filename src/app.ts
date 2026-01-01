import { ActivityType } from "discord.js";
import { createClient } from "./client/createClient.ts";
import dotenv from "dotenv";
import { loadAllEvents } from "./utils/loadEvents.ts";
import { loadAllCommands } from "./utils/loadCommand.ts";

dotenv.config();

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error("BOT_TOKEN is not defined in the environment variables");
}




export async function startBot() {
  const events = await loadAllEvents();
  const commands = await loadAllCommands();

  const client = createClient(events, commands);
  await client.login(token);
}
