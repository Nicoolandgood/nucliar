import { ClassComponent, FuncComponent, HoComponent, HookComponent } from "../core/component";
import { GenerateOptions } from "../interfaces/commands";
import { ComponentType } from "./component";
import { StyleLanguage } from "./file";

export const COMPONENTS_MAP = {
    [ComponentType.DEFAULT] : FuncComponent,
    [ComponentType.CLASS]: ClassComponent,
    [ComponentType.HOC]: HoComponent,
    [ComponentType.HOOK]: HookComponent,
};

export const COMPONENTS_MAP_KEYS = Object.keys(COMPONENTS_MAP);

export const DEFAULT_OPTIONS: GenerateOptions = {
    dryRun: false,
    useTypescript: false,
    useJsx: false,
    generateLazy: false,
    generateStyle: true,
    preprocessor: StyleLanguage.CSS,
}