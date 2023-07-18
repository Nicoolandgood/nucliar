export enum Language {
    TYPESCRIPT = "typescript",
    JAVASCRIPT = "javascript",
}

export const LANGUAGE_EXTENTION = {
    [Language.JAVASCRIPT]: 'js',
    [Language.TYPESCRIPT]: 'ts',
} as const;

export enum StyleLanguage {
    CSS = "css",
    LESS = "less",
    SCASS = "scass",
}

export const STYLE_EXTENSION = {
    [StyleLanguage.CSS]: "css",
    [StyleLanguage.LESS]: "less",
    [StyleLanguage.SCASS]: "scss",
} as const;