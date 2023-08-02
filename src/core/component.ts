import { camelCase } from "lodash";
import { classComponent, funcComponent, hoComponent, hookComponent, lazyComponent, providerTemplate } from "../templates/component";
import { pascalCase } from "../utils/misc";
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

    get computedName() {
        return pascalCase(this.name);
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

/**
 * Component class used to generate functional components.
 * @see https://react.dev/learn/your-first-component#defining-a-component
 */
export class FuncComponent extends Component {
    
    constructor(
        name: string,
        isTs?: boolean,
        isJSX?: boolean,
        path? :string,
    ) {
        super(name, isTs, isJSX, funcComponent, path);
    }
}

/**
 * Component class used to generate class based components.
 * @see https://react.dev/reference/react/Component
 */
export class ClassComponent extends Component {
    
    constructor(
        name: string,
        isTs?: boolean,
        isJSX?: boolean,
        path? :string,
    ) {
        super(name, isTs, isJSX, classComponent, path);
    }
}

/**
 * Component class used to generate HOCs.
 * @see https://legacy.reactjs.org/docs/higher-order-components.html
 */
export class HoComponent extends Component {

    constructor(
        name: string,
        isTs?: boolean,
        isJSX?: boolean,
        path? :string,
    ) {
        super(name, isTs, isJSX, hoComponent, path);
    }

    get computedName() {
        return camelCase(this.name);
    }
}

/**
 * Component class used to generate hooks.
 * @see https://react.dev/learn/reusing-logic-with-custom-hooks
 */
export class HookComponent extends Component {

    constructor(
        name: string,
        isTs?: boolean,
        isJSX?: boolean,
        path? :string,
    ) {
        super(name, isTs, isJSX, hookComponent, path);
    }

    get computedName() {
        return camelCase(this.name);
    }
}

/**
 * Component class used to generate providers.
 * @see https://react.dev/learn/passing-data-deeply-with-context
 */
export class ProviderComponent extends Component {
    constructor(
        name: string,
        isTs?: boolean,
        isJSX?: boolean,
        path? :string,
    ) {
        super(name, isTs, isJSX, providerTemplate, path);
    }
}