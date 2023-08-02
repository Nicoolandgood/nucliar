import { STYLE_EXTENSION, StyleLanguage } from "../constants/file";
import { cssStyle } from "../templates/style";
import { GeneratedFile } from "./file";

/**
 * Base class to generate style sheets.
 */
export class Style extends GeneratedFile {

    constructor(
        name: string,
        private preprocessor: StyleLanguage,
        private module: boolean = false,
        path?: string,
    ) {
        super(name, cssStyle, path);
    }
    
    get extension(): string {
        return `${this.module? 'module.': ''}${STYLE_EXTENSION[this.preprocessor]}`;
    }
}