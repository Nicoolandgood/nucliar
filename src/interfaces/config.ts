import { StyleLanguage } from "../constants/file";

export interface ConfigurationFile {
    useTypescript: boolean;
    useJsx: boolean;
    preprocessor: StyleLanguage;
    generateLazy: boolean;
    generateStyle: boolean;
}
