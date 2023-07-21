import { ComponentType } from "../constants/component";
import { StyleLanguage } from "../constants/file";

export interface BaseConfiguration {
    useTypescript: boolean;
    useJsx: boolean;
    preprocessor: StyleLanguage;
    generateLazy: boolean;
    generateStyle: boolean;
    flat: boolean;
}

export interface ComponentConfiguration {
    useTypescript?: boolean;
    useJsx?: boolean;
    preprocessor?: StyleLanguage | string | boolean;
    generateLazy?: boolean;
    generateStyle?: boolean;
    template?: string;
    flat?: boolean;
}

export interface ConfigurationFile extends BaseConfiguration {
    types: { [key: ComponentType | string]:  ComponentConfiguration };
}
