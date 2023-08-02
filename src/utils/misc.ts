import { readFile } from "fs/promises";
import { join, normalize } from "path";
import { cwd } from "process";
import { PackageJSON } from "../interfaces/misc";


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