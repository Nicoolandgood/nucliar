import { STYLE_EXTENSION, StyleLanguage } from "../constants/file";
import { GeneratedFile } from "./file";

export class Style extends GeneratedFile {

    constructor(
        name: string,
        private preprocessor: StyleLanguage,
    ) {
        super(name);
    }

    get renderData(): object {
        return {};
    }
    
    get template(): string {
        return "";
    }
    
    get extension(): string {
        return STYLE_EXTENSION[this.preprocessor];
    }
}