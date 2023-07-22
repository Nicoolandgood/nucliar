import { createCommand } from "@commander-js/extra-typings";
import { prompt } from 'enquirer';
import { ConfigurationFile } from "../interfaces/config";
import { StyleLanguage } from "../constants/file";
import { writeConfigurationFile } from "../utils/config";
import { InitOptions } from "../interfaces/commands";
import { DEFAULT_CONFIG_FILE } from "../constants/config";

const questions: any[] = [
    {
        type: "toggle",
        name: "useJsx",
        message: "Generate JSX/TSX files?",
        initial: DEFAULT_CONFIG_FILE.useJsx,
    },
    {
        type: "toggle",
        name: "useTypescript",
        message: "Use of Typescript for this project?",
        initial: DEFAULT_CONFIG_FILE.useTypescript,
    },
    {
        type: "toggle",
        name: "flat",
        message: "Prevent the folder generation when a component is created?",
        initial: DEFAULT_CONFIG_FILE.flat,
    },
    {
        type: "select",
        name: "preprocessor",
        message: "Use of a style preprocessor for this project?",
        initial: 0,
        choices: Object.values(StyleLanguage),
    },
    {
        type: "toggle",
        name: "generateLazy",
        message: "Generate a lazy version of a component when created?",
        initial: DEFAULT_CONFIG_FILE.generateLazy,
    },
]

async function handler(options: InitOptions) {
    const config = await prompt<ConfigurationFile>(questions);
    const finalConfig = { ...DEFAULT_CONFIG_FILE, ...config, }
    if(options.dryRun) {
        console.log(finalConfig);
        return;
    }
    await writeConfigurationFile(finalConfig);
}

const cmd = createCommand("init")
    .alias("i")
    .description("Init the configuration file for the project.")
    .option('-d, --dry-run', "Prevent config file generation and show result.")
    .action(handler);

export default cmd;