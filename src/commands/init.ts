import { createCommand } from "@commander-js/extra-typings";
import { prompt } from 'enquirer';
import { ConfigurationFile } from "../interfaces/config";
import { StyleLanguage } from "../constants/file";
import { writeConfigurationFile } from "../utils/config";

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

async function handler() {
    const config = await prompt<ConfigurationFile>(questions);
    await writeConfigurationFile(config);
}

const cmd = createCommand("init")
    .alias("i")
    .description("Init the configuration file for the project.")
    .action(handler);

export default cmd;