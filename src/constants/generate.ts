import { GenerateOptions } from "../interfaces/commands";
import { StyleLanguage } from "./file";


export const DEFAULT_OPTIONS: GenerateOptions = {
    dryRun: false,
    useTypescript: false,
    useJsx: false,
    generateLazy: false,
    generateStyle: true,
    preprocessor: StyleLanguage.CSS,
}