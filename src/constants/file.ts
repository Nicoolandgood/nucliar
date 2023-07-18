export enum Language {
    TYPESCRIPT = "TYPESCRIPT",
    JAVASCRIPT = "JAVASCRIPT",
}

export const LANGUAGE_EXTENTION = {
    [Language.JAVASCRIPT]: 'js',
    [Language.TYPESCRIPT]: 'ts',
} as const;

export enum StyleLanguage {
    CSS = "CSS",
    LESS = "LESS",
    SCASS = "SCASS",
}

export const STYLE_EXTENSION = {
    [StyleLanguage.CSS]: "css",
    [StyleLanguage.LESS]: "less",
    [StyleLanguage.SCASS]: "scss",
} as const;