import { STYLE_EXTENSION, StyleLanguage } from "../constants/file";
import { cssStyle } from "../templates/style";
import { GeneratedFile } from "./file";

export class Style extends GeneratedFile {

    constructor(
        name: string,
        private preprocessor: StyleLanguage,
        private module: boolean = false,
        path?: string,
    ) {
        super(name, path);
    }
    
    get template(): string {
        return cssStyle;
    }
    
    get extension(): string {
        return `${this.module? 'module.': ''}${STYLE_EXTENSION[this.preprocessor]}`;
    }
}