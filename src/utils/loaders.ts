import type { PathLike } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import { URL } from "node:url";
import type { Command } from "../commands";
import { predicate as commandPredicate } from "../commands";
import type { Event } from "../events";
import { predicate as eventPredicate } from "../events";

/**
 * A predicate to check if the structure is valid
 */
export type StructurePredicate<T> = (structure: unknown) => structure is T;

/**
 * Loads all the structures in the provided directory
 *
 * @param directory - The directory to load the structures from
 * @param predicate - The predicate to check if the structure is valid
 * @param recursive - Whether to recursively load the structures in the directory
 * @returns
 */
export async function loadStructures<T>(
  directory: PathLike,
  predicate: StructurePredicate<T>,
  recursive = true,
): Promise<T[]> {
  // Get the stats of the directory
  const statDirectory = await stat(directory);

  // If the provided directory path is not a directory, throw an error
  if (!statDirectory.isDirectory()) {
    throw new Error(`The directory '${directory}' is not a directory.`);
  }

  // Get all the files in the directory
  const files = await readdir(directory);

  // Create an empty array to store the structures
  const structures: T[] = [];

  // Loop through all the files in the directory
  for (const file of files) {
    // If the file is index.js or the file does not end with .js, skip the file
    if (file === "index.ts" || !file.endsWith(".ts")) {
      continue;
    }

    // Get the stats of the file
    const statFile = await stat(new URL(`${directory}/${file}`));

    // If the file is a directory and recursive is true, recursively load the structures in the directory
    if (statFile.isDirectory() && recursive) {
      structures.push(...(await loadStructures(`${directory}/${file}`, predicate, recursive)));
      continue;
    }

    // Import the structure dynamically from the file
    const { default: structure } = await import(`${directory}/${file}`);

    // If the structure is a valid structure, add it
    if (predicate(structure)) structures.push(structure);
  }

  return structures;
}

export async function loadCommands(directory: PathLike, recursive = true): Promise<Map<string, Command>> {
  const commands = new Map<string, Command>();
  for (const command of await loadStructures(directory, commandPredicate, recursive)) {
    commands.set(command.data.name, command);
  }
  return commands;
}

export async function loadEvents(directory: PathLike, recursive = true): Promise<Event[]> {
  return loadStructures(directory, eventPredicate, recursive);
}
