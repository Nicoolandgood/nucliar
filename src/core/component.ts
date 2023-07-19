import { funcComponent, classComponent, hoComponent, hookComponent, lazyComponent } from "../templates/component";
import { GeneratedFile } from "./file";
import { Style } from "./style";

export abstract class Component extends GeneratedFile {

    protected _style?: Style;
    
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

export class HoComponent extends Component {

    computeName(name: string): string {
        return `with${name}`;
    }

    get template() {
        return hoComponent;
    }
}

export class HookComponent extends Component {

    computeName(name: string): string {
        return `use${name}`;
    }

    get template() {
        return hookComponent;
    }
}

export class LazyComponent extends Component {
    get template() {
        return lazyComponent;
    }

    get extension() {
        return `lazy.${super.extension}`;
    }
}

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

export class FuncComponent extends DisplayComponent {
    get template() {
        return funcComponent;
    }
}

export class ClassComponent extends DisplayComponent {
    get template() {
        return classComponent;
    }
}