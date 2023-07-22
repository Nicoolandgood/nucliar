import { funcComponent, classComponent, hoComponent, hookComponent, lazyComponent } from "../templates/component";
import { GeneratedFile } from "./file";
import { Style } from "./style";

/**
 * Base class used to generate components. 
 * Extend it in order to create a custom component generator class.
 * 
 * Example:
 * ```js
 * class MyCustomComponent extends Component {
 *      get template() {
 *          return '() => ({ content: "Hello from {{it.name}}!" }';
 *      }
 * }
 * ```
 */
export abstract class Component extends GeneratedFile {
    
    constructor(
        name: string,
        protected isTs: boolean = false,
        protected useJSX: boolean = false,
        path?: string,
    ) {
        super(name, path);
    }

    get template() {
        return "";
    }

    get extension() {
        const base = this.isTs ? 'ts': 'js';
        return base + (this.useJSX ? 'x': '');
    }
}

/**
 * Component class used to generate HOCs.
 * @see https://legacy.reactjs.org/docs/higher-order-components.html
 */
export class HoComponent extends Component {

    computeName(name: string): string {
        return `with${name}`;
    }

    get template() {
        return hoComponent;
    }
}

/**
 * Component class used to generate hooks.
 * @see https://react.dev/learn/reusing-logic-with-custom-hooks
 */
export class HookComponent extends Component {

    computeName(name: string): string {
        return `use${name}`;
    }

    get template() {
        return hookComponent;
    }
}

/**
 * Component class used to create lazy components.
 * @see https://react.dev/reference/react/lazy
 */
export class LazyComponent extends Component {
    get template() {
        return lazyComponent;
    }

    get extension() {
        return `lazy.${super.extension}`;
    }
}

/**
 * Abstract component class used to create components meant to display
 * visual elements (basically, anything that returns html).
 * 
 * A `Style` and/or a `LazyComponent` instance can be passed to link a style and/or a lazy counterpart
 * to the current instance of the `DisplayComponent`:
 * ```js
 * const myComponent = new MyDisplayComponent("MyDisplaycomponent"); // Extends DisplayComponent.
 * const myStyle = new Style("myStyle", "css");
 * const myLazy = new LazyComponent("myLazy");
 * myComponent.setStyle(myStyle);
 * myComponent.setLazy(myLazy);
 * 
 * myComponent.create(); // Creates the component, its style and its lazy counterpart.
 * ```
 * 
 * Extend it such as `Component` in order to create your own custom display component class.
 */
export abstract class DisplayComponent extends Component {
    protected _lazy?: LazyComponent;
    protected _style?: Style;

    setLazy(value: LazyComponent) {
        value.setPath(this.path);
        this._lazy = value;
    }

    get lazy() {
        return this._lazy;
    }

    setStyle(value: Style) {
        value.setPath(this.path);
        this._style = value;
    }

    get style() {
        return this._style;
    }

    setPath(value: string): void {
        if(this.lazy) 
            this.lazy.setPath(value);

        if(this.style)
            this.style.setPath(value);

        super.setPath(value);
    }

    async create(): Promise<void> {
        if(this.lazy)
            await this.lazy.create();

        if(this.style) 
            await this.style.create();
        
        await super.create();
    }
}

/**
 * Display component class used to generate functional components.
 * @see https://react.dev/learn/your-first-component#defining-a-component
 */
export class FuncComponent extends DisplayComponent {
    get template() {
        return funcComponent;
    }
}

/**
 * Display component class used to generate class based components.
 * @see https://react.dev/reference/react/Component
 */
export class ClassComponent extends DisplayComponent {
    get template() {
        return classComponent;
    }
}

/**
 * Display component class used to generate component from custom template.
 */
export class CustomComponent extends DisplayComponent {
    
    private _template: string;

    constructor(name: string, template: string, isTs?: boolean, useJSX?: boolean, path?: string) {
        super(name, isTs, useJSX, path);
        this._template = template;
    }

    setTemplate(value: string) {
        this._template = value;
    }

    get template() {
        return this._template;
    }
}