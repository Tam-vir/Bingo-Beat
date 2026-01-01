import { Client } from "discord.js";

export default async function onReadyEvent(client: Client) {
  console.log(`Logged in as ${client.user?.tag}!`);
}
