import { ActivityType } from "discord.js";
import { createClient } from "./client/createClient.ts";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error("BOT_TOKEN is not defined in the environment variables");
}

const client = createClient();

client.on("clientReady", () => {
  console.log(`Logged in as ${client.user?.tag}`);
  //set status to streaming
  client.user?.setPresence({
    activities: [{ name: "Bingo Beat", type: ActivityType.Streaming }],
    status: "dnd",
  });
});
export async function startBot() {
  await client.login(token);
}