import { render } from 'squirrelly';
import { dirname, basename, join, normalize } from "path";
import { writeFile, mkdir } from 'fs/promises';
import { getRandomToken } from '../utils/misc';

/**
 * Base class to generate any file.
 * Extend this class to create your own file generator.
 * 
 * Example:
 * ```js
 * class JSONFile extends GeneratedFile {
 *       
 *      constructor(name, content) {
 *          super(name);
 *          this.content = content;
 *      }
 * 
 *      get extension() {
 *          return "json";
 *      }
 * 
 *      get template() {
 *          const renderContent = JSON.stringify(this.content);
 *          return '{ "{{it.name}}": '+ renderContent +' }';
 *      }
 * }
 * ```
 */
export class GeneratedFile {
    
    private _name: string;
    private _path: string;

    private _linkedFiles: Map<string, GeneratedFile> = new Map();
    private _parentFile?: GeneratedFile;

    private _template: string;

    protected readonly token: string;
    
    constructor(
        _name: string,
        _template: string,
        _path?: string,
    ) {
        // Checking if path was given. If not, extracting possible
        // path in name string.
        this._path = _path ? normalize(_path) :dirname(_name);
        this._name = basename(_name).trim();
        this._template = _template;
        this.token = getRandomToken();
    };

    setParentFile(file: GeneratedFile) {
        if(file.token === this.token)
            return;
        this._parentFile = file;
    }

    linkFiles(...files: GeneratedFile[]) {
        for (const file of files) {
            if(file.token === this.token || this._parentFile) 
                break;
            
            file.setParentFile(this);
            this._linkedFiles.set(file.token, file)
        }
    }

    unlinkFile(file: GeneratedFile) {
        return this._linkedFiles.delete(file.token);
    }

    isFileLinked(file: GeneratedFile) {
        return this._linkedFiles.has(file.token);
    }

    get linkedFiles() {
        return [...this._linkedFiles.values()];
    }

    /**
     * Getter returning an object that will be
     * passed to the template engine before rendering.
     */
    get renderData(): any {
        return this;
    };
    
    /**
     * Getter returning the boilerplate template.
     */
    get template(): string {
        return this._template;
    }

    setTemplate(value: string) {
        this._template = value;
    }

    /**
     * Renders the content of the file depending on the
     * current template and data.
     */
    render(): string {
        return (render(this.template, this.renderData) as string).trim();
    }

    renderAll(separator = "\n") {
        return [
            ...this.linkedFiles, 
            this,
        ]
        .map(file => file.render())
        .join(separator);
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
     * Creates the file and its linked files on the disk.
     */
    async createAll() {
        return Promise.all(
            [
                this,
                ...this._linkedFiles.values(),
            ]
            .map(file => file.create())
        );
    }

    /**
     * Getter returning the file extension. 
     */
    get extension(): string {
        return "";
    }

    /**
     * File short name.
     */
    get name() {
        return this._name || `file_${this.token}`;
    }

    /**
     * Applies changes for naming. 
     */
    get computedName() {
        return this.name;
    }

    /**
     * Complete file name (name + extension).
     */
    get filename() {
        return this.name + (this.extension? `.${this.extension}`: '');
    }

    /**
     * Complete file path (path + filename).
     */
    get filepath() {
        return join(this.path, this.filename);
    }

    /**
     * Path of the directory where the file is.
     */
    get path(): string {
        return this._parentFile?.path ?? this._path;
    }

    setPath(value: string) {
        this._path = normalize(value);
    }

    toString() {
        return this.render();
    }
}