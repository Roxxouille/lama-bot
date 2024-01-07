import { ApplicationCommandOptionType } from "discord.js";
import type { Command } from "./index";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";

export default {
  data: {
    name: "roll",
    description: "Roll some dices!",
    options: [
      {
        type: ApplicationCommandOptionType.String,
        name: "dices",
        description: "The dices you want to roll",
        required: true,
      },
    ],
  },
  async execute(interaction) {
    try {
      const roll = new DiceRoll(String(interaction.options.get("dices")?.value));
      await interaction.reply(roll.output);
    } catch (error) {
      console.error(error);
      const message = (error as { message?: string })?.message;
      await interaction.reply(message ?? "Something went wrong");
    }
  },
} satisfies Command;
