import { lazyComponent } from "../templates/component";
import { GeneratedFile } from "./file";
import { Style } from "./style";

/**
 * Base class used to generate components. 
 * Extend it in order to create a custom component generator class.
 */
export class Component extends GeneratedFile {   
    
    constructor(
        name: string,
        protected isTs: boolean = false,
        protected useJSX: boolean = false,
        template: string = "",
        path?: string,
    ) {
        super(name, template, path);
    }

    get extension() {
        const base = this.isTs ? 'ts': 'js';
        return base + (this.useJSX ? 'x': '');
    }

    get styles() {
        return this.linkedFiles.filter(file => file instanceof Style) as Style[];
    }
}

/**
 * Component class used to create lazy components.
 * @see https://react.dev/reference/react/lazy
 */
export class LazyComponent extends Component {
    
    constructor(
        name: string,
        isTs?: boolean,
        isJSX?: boolean,
        path? :string,
    ) {
        super(name, isTs, isJSX, lazyComponent, path);
    }

    get extension() {
        return `lazy.${super.extension}`;
    }
}