import { ComponentConfiguration } from "./config";

export interface GenerateOptions extends ComponentConfiguration {
    dryRun?: boolean;
}

export interface InitOptions {
    dryRun?: boolean;
}