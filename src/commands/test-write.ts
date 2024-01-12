import { setCharacters } from "../utils/storage-handler";
import type { Command } from "./index";

export default {
  data: {
    name: "test-write",
    description: "test!",
  },
  async execute(interaction) {
    console.log(await setCharacters());
    await interaction.reply("Pong!");
  },
} satisfies Command;
