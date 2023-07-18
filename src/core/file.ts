import { render } from 'squirrelly';
import { dirname, basename, join } from "path";
import { writeFile } from 'fs/promises';

export abstract class GeneratedFile {
    
    private _name: string;
    private _path: string;
    
    constructor(
        _name: string,
    ) {
        this._path = dirname(_name);
        _name = basename(_name);
        this._name = this.computeName(_name);
    };

    /**
     * Applies changes for naming.
     * This method is called by the constructor and the `name` setter. If you need
     * to put your own naming scheme, you can override it. 
     */
    computeName(name: string) {
        return name;
    }

    /**
     * Getter returning an object that will be
     * passed to the template engine before rendering.
     * - Needs to be implemented.
     */
    abstract get renderData(): object;
    
    /**
     * Getter returning the boilerplate template.
     * - Needs to be implemented.
     */
    abstract get template(): string;

    /**
     * Renders the content of the file depending on the
     * current template and data.
     */
    render(): string {
        return (render(this.template, this.renderData) as string).trim();
    }

    /**
     * Creates the file on disk.
     */
    async create() {
        return await writeFile(this.path, this.render());
    }

    /**
     * Getter returning the file extension. 
     * - Needs to be implemented.
     */
    abstract get extension(): string;

    /**
     * Getter returning the file short name.
     */
    get name() {
        return this._name;
    }

    /**
     * Getter returning the complete file name
     * (name + extension).
     */
    get filename() {
        return `${this.name}.${this.extension}`;
    }

    get path() {
        return join(this._path, this.filename);
    }
}