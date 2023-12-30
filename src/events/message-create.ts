import { Events } from "discord.js";
import type { Event } from "./index";

export default {
  name: Events.MessageCreate,
  async execute(message) {
    console.log(message.content);
    if (!isFeur(message.content)) {
      return;
    }

    await message.react("🇫");
    await message.react("🇪");
    await message.react("🇺");
    await message.react("🇷");
  },
} satisfies Event<Events.MessageCreate>;

const feurEndings = ["quoi", "quoi ?", "quoi?", "koi", "koi ?", "koi"];

function isFeur(string_: string) {
  return feurEndings.some((ending) => string_.trim().endsWith(ending));
}
