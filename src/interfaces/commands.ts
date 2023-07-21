export interface GenerateOptions {
    style?: boolean;
    dryRun?: boolean;
    ts?: boolean;
    jsx?: boolean;
    lazy?: boolean;
    preprocessor?: string | boolean;
}

export interface InitOptions {
    dryRun?: boolean;
}