import { ComponentConfiguration } from "./config";

export interface GenerateOptions extends ComponentConfiguration {
    dryRun?: boolean;
    force?: boolean;
}

export interface InitOptions {
    dryRun?: boolean;
}