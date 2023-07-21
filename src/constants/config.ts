import { BaseConfiguration, ConfigurationFile } from "../interfaces/config";
import { ComponentType } from "./component";
import { StyleLanguage } from "./file";

export const CONFIG_FILE_NAME = "nucliar.json";

export const DEFAULT_BASE_CONFIG: BaseConfiguration = {
    useJsx: false,
    useTypescript: false, 
    generateLazy: false,
    generateStyle: false,
    flat: false,
    preprocessor: StyleLanguage.CSS,
}

export const DEFAULT_CONFIG_FILE: ConfigurationFile = {
    ...DEFAULT_BASE_CONFIG,
    types: {
        [ComponentType.DEFAULT]: {
            generateStyle: true,
        },
        [ComponentType.CLASS]: {
            generateStyle: true,
        },
        [ComponentType.HOC]: {
            flat: true,
        },
        [ComponentType.HOOK]: {
            flat: true,
        },
    }
}