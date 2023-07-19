import { ConfigurationFile } from "../interfaces/config";
import { writeFile, readFile } from 'fs/promises';
import { cwd } from "process";
import { join, normalize } from "path";
import { CONFIG_FILE_NAME } from "../constants/config";

export async function writeConfigurationFile(config: ConfigurationFile, path?: string): Promise<void>  {
    const content = JSON.stringify(config, null, 2);
    const filePath = join(path? normalize(path): cwd(), CONFIG_FILE_NAME);
    return await writeFile(filePath, content);
}

export async function loadConfigurationFile(path?: string): Promise<ConfigurationFile> {
    const filePath = path ? normalize(path): join(cwd(), CONFIG_FILE_NAME);
    const content = await readFile(filePath, { encoding: 'utf-8' });
    return JSON.parse(content);
}