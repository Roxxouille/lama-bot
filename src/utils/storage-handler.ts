import { writeFile, readFile } from "node:fs/promises";

const baseFolder = Bun.env.NODE_ENV === "production" ? "../data" : "./data_dev";

export async function getCharacters() {
  return JSON.parse(await readFile(`${baseFolder}/sots/dominic.json`, { encoding: "utf8" }));
}

export async function setCharacters() {
  return await writeFile(`${baseFolder}/sots/dominic.json`, JSON.stringify({ name: "Dominic" }));
}
