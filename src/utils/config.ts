import { ConfigurationFile } from "../interfaces/config";
import { writeFile, readFile } from 'fs/promises';
import { cwd } from "process";
import { join, normalize } from "path";
import { CONFIG_FILE_NAME, DEFAULT_CONFIG_FILE } from "../constants/config";

export async function writeConfigurationFile(config: ConfigurationFile, path?: string): Promise<boolean>  {
    const content = JSON.stringify(config, null, 2);
    const filePath = join(path? normalize(path): cwd(), CONFIG_FILE_NAME);
    try {
        await writeFile(filePath, content);
        return true;
    } catch (error: any) {
        console.error("An error has occured when writing the configuration file.", `Code: ${error.code}`);
        return false;
    }
}

export async function loadConfigurationFile(path?: string): Promise<ConfigurationFile> {
    const filePath = path ? normalize(path): join(cwd(), CONFIG_FILE_NAME);
    try {
        const content = await readFile(filePath, { encoding: 'utf-8' });
        const configFile = JSON.parse(content);
        return { ...DEFAULT_CONFIG_FILE, ...configFile };
    } catch (error: any) {
        if(error.code !== "ENOENT") {
            console.error("An error has occured when reading the configuration file.", `Code: ${error.code}`);
        }
        return DEFAULT_CONFIG_FILE;
    }
}