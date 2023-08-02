import { readFile } from "fs/promises";
import { join, normalize } from "path";
import { cwd } from "process";
import { PackageJSON } from "../interfaces/misc";
import { camelCase, startCase } from "lodash";


export function getPackageJSON(): PackageJSON{
    return require('../../package.json');
}

export function getCwdFilepath(rawFilepath: string) {
    return join(cwd(), normalize(rawFilepath));
}

export async function getFileContent(filepath: string) {
    filepath = getCwdFilepath(filepath);
    return await readFile(filepath, { encoding: "utf-8" });
}

export function capitalize(input: string) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}

export function getRandomToken() {
    return Math.random().toString(36).slice(2);
}

/**
 * Converts string to pascal case.
 * @param string The string to convert.
 * @returns Returns the pascal cased string.
 */
export function pascalCase(string: string | undefined) {
    return startCase(camelCase(string)).replace(/\s/g, '')
}