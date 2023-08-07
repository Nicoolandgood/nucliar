import { STYLE_EXTENSION, StyleLanguage } from "../constants/file";
import { cssStyle } from "../templates/style";
import { GeneratedFile } from "./file";

/**
 * Base class to generate style sheets.
 */
export class Style extends GeneratedFile {

    constructor(
        name: string,
        private preprocessor: StyleLanguage = StyleLanguage.CSS,
        private module: boolean = false,
        path?: string,
    ) {
        super(name, cssStyle, path);
    }
    
    get extension(): string {
        if(!(this.preprocessor in STYLE_EXTENSION))
            return "";
        return `${this.module? 'module.': ''}${STYLE_EXTENSION[this.preprocessor]}`;
    }
}