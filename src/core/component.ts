import { funcComponent, classComponent, hoComponent, hookComponent } from "../templates/component";
import { GeneratedFile } from "./file";
import { Style } from "./style";

export class Component extends GeneratedFile {

    protected _style?: Style;
    
    constructor(
        name: string,
        protected isTs: boolean = false,
        protected useJSX: boolean = false,
        style?: Style,
        path?: string,
    ) {
        super(name, path);
        
        if(style)
            this.setStyle(style);
    }
    
    async create() {
        if(this.style) {
            await this.style.create();
        }
        await super.create();
    }

    get template() {
        return funcComponent;
    }

    get extension() {
        const base = this.isTs ? 'ts': 'js';
        return base + (this.useJSX ? 'x': '');
    }

    get style() {
        return this._style;
    }

    setStyle(value: Style) {
        value.setPath(this.path);
        this._style = value;
    }

    setPath(value: string): void {
        if(this.style)
            this.style.setPath(value);
 
        super.setPath(value);
    }

    toString(): string {
        return `${this.render()}${this.style? '\n\n' + this.style.render(): ''}`;
    }

}

export class ClassComponent extends Component {
    get template () {
        return classComponent;
    }
}

export class HoComponent extends Component {
    get template() {
        return hoComponent;
    }
}

export class HookComponent extends Component {
    get template() {
        return hookComponent;
    }
}