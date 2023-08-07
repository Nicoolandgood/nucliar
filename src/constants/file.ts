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
    SASS = "sass",
}

export const STYLE_LANGAUGE_VALUES = Object.values(StyleLanguage);

export const STYLE_EXTENSION = {
    [StyleLanguage.CSS]: "css",
    [StyleLanguage.LESS]: "less",
    [StyleLanguage.SASS]: "scss",
} as const;