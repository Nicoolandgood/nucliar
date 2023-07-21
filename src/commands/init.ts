import { createCommand } from "@commander-js/extra-typings";
import { prompt } from 'enquirer';
import { ConfigurationFile } from "../interfaces/config";
import { StyleLanguage } from "../constants/file";
import { writeConfigurationFile } from "../utils/config";
import { InitOptions } from "../interfaces/commands";

const questions: any[] = [
    {
        type: "toggle",
        name: "useJsx",
        message: "Generate JSX/TSX files?",
    },
    {
        type: "toggle",
        name: "useTypescript",
        message: "Use of Typescript for this project?",
        initial: false,
    },
    {
        type: "toggle",
        name: "generateStyle",
        message: "Generate a style sheet on component creation?",
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
        initial: false,
    },
]

async function handler(options: InitOptions) {
    const config = await prompt<ConfigurationFile>(questions);
    if(options.dryRun) {
        console.log(config);
        return;
    }
    await writeConfigurationFile(config);
}

const cmd = createCommand("init")
    .alias("i")
    .description("Init the configuration file for the project.")
    .option('-d, --dry-run', "Prevent config file generation and show result.")
    .action(handler);

export default cmd;