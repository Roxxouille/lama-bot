import { getCharacters } from "../utils/storage-handler";
import type { Command } from "./index";

export default {
  data: {
    name: "test-get",
    description: "test!",
  },
  async execute(interaction) {
    console.log(await getCharacters());
    await interaction.reply("Pong!");
  },
} satisfies Command;
