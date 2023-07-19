import { render } from 'squirrelly';
import { dirname, basename, join, normalize } from "path";
import { writeFile, mkdir } from 'fs/promises';

export abstract class GeneratedFile {
    
    private _name: string;
    private _path: string;
    
    // private _linkedFiles: Map<string, GeneratedFile>;
    // private _parentFile: GeneratedFile | null;
    
    constructor(
        _name: string,
        _path?: string,
    ) {
        // Checking if path was given. If not, extracting possible
        // path in name string.
        this._path = _path ? normalize(_path) :dirname(_name);
        _name = basename(_name);
        this._name = this.computeName(_name);
        // this._linkedFiles = new Map();
        // this._parentFile = null;
    };

    /**
     * Applies changes for naming.
     * This method is called by the constructor and the `name` setter. If you need
     * to put your own naming scheme, you can override it. 
     */
    computeName(name: string) {
        return name;
    }

    // get linkedFiles() {
    //     return this._linkedFiles.values();
    // }

    // linkFile(file: GeneratedFile) {
    //     this._linkedFiles.set(file.filepath, file);
    // }

    // unlinkFile(file: GeneratedFile) {
    //     return this._linkedFiles.delete(file.filepath);
    // }

    // setParentFile(file: GeneratedFile) {
    //     this._parentFile = file;
    // }

    /**
     * Getter returning an object that will be
     * passed to the template engine before rendering.
     */
    get renderData(): any {
        return this;
    };
    
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
        // TODO: look for any pre-existing and warn
        await mkdir(this.path, { recursive: true });
        await writeFile(this.filepath, this.render());
    }

    /**
     * Getter returning the file extension. 
     * - Needs to be implemented.
     */
    abstract get extension(): string;

    /**
     * File short name.
     */
    get name() {
        return this._name;
    }

    /**
     * Complete file name (name + extension).
     */
    get filename() {
        return `${this.name}.${this.extension}`;
    }

    /**
     * Complete file path (path + filename).
     */
    get filepath() {
        return join(this._path, this.filename);
    }

    /**
     * Path of the directory where the file is.
     */
    get path() {
        return this._path;
    }

    setPath(value: string) {
        this._path = normalize(value);
    }

    toString() {
        return this.render();
    }
}