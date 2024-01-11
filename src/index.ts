import { Client, GatewayIntentBits } from "discord.js";
import { loadCommands, loadEvents } from "./utils/loaders";
import { registerEvents } from "./utils/register-events";
import { deployCommands } from "./utils/deploy";

if (Bun.env.NODE_ENV === "production") {
  await deployCommands();
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const events = await loadEvents(new URL("events/", import.meta.url));
const commands = await loadCommands(new URL("commands/", import.meta.url));

registerEvents(commands, events, client);

void client.login(Bun.env.DISCORD_TOKEN);
