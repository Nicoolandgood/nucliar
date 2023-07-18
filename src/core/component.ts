import { baseComponent } from "../templates/component";
import { GeneratedFile } from "./file";

export class Component extends GeneratedFile {
    
    constructor(
        name: string,
        private isTs: boolean,
        private useJSX: boolean,
    ) {
        super(name);
    }

    get renderData() {
        return { 
            componentName: this.name,
            useJSX: this.useJSX,
            isTs: this.isTs,
        };
    }

    get template() {
        return baseComponent;
    }

    get extension() {
        const base = this.isTs ? 'ts': 'js';
        return base + (this.useJSX ? 'x': '');
    }

}