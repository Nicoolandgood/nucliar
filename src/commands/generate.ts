import { createCommand } from "@commander-js/extra-typings";
import { prompt } from 'enquirer';
import { LazyComponent, DisplayComponent, CustomComponent } from "../core/component";
import { ComponentType } from "../constants/component";
import { StyleLanguage } from "../constants/file";
import { Style } from "../core/style";
import { join, normalize } from "path";
import { GenerateOptions } from "../interfaces/commands";
import { COMPONENTS_MAP, COMPONENTS_MAP_KEYS } from "../constants/generate";
import { loadConfigurationFile } from "../utils/config";
import { existsSync } from "fs";
import { getFileContent } from "../utils/misc";

async function handler(type: string, name: string, options: GenerateOptions) {

    const { types, ...configOptions } = await loadConfigurationFile();
    const typeOptions = types[type] ?? {};
    options = { ...configOptions, ...typeOptions, ...options };

    const isVanilla = type in COMPONENTS_MAP;           // True if the type is included in nucliar.
    const isCustom = (type in types) && !isVanilla;

    let component;

    if(isCustom) {
        // Custom component type
        if(!options.template) {
            throw new Error(`No template found in configuration file for type "${type}".`)
        }

        if(!existsSync(options.template)) {
            throw new Error(`The template file ${options.template} does not exist.`);
        }

        const customTemplate = await getFileContent(options.template);
        component = new CustomComponent(name, customTemplate, options.useTypescript, options.useJsx);
    }
    else if (!isVanilla) {
        const validTypes = Object.keys({ ...types, ...COMPONENTS_MAP }).join(', ');
        throw new Error(`"${type}" is not a valid type. The value must be one of these: ${validTypes}.`);
    }
    else {
        const _Component = COMPONENTS_MAP[type as ComponentType];
        component = new _Component(name, options.useTypescript, options.useJsx);
    }
    
    
    if (component instanceof DisplayComponent) {

        if(options.preprocessor && options.generateStyle) {
            const preprocessor = typeof options.preprocessor == "boolean"? StyleLanguage.CSS: options.preprocessor;
            
            const style = new Style(name, preprocessor as StyleLanguage);
            component.setStyle(style);
        }
    
        if(options.generateLazy) {
            const lazy = new LazyComponent(name, options.useTypescript, options.useJsx);
            component.setLazy(lazy);
        }
    }

    if (options.path) {
        const normalizedPath = normalize(options.path);
        component.setPath(join(normalizedPath, component.path));
    }

    if (!options.flat) {
        component.setPath(join(component.path, component.name));
    }
    
    if (options.dryRun) {
        console.log(component.toString());
        return;
    }

    if (!options.force && existsSync(component.filepath)) {
        const { force } = await prompt<any>({
            name: "force",
            type: "toggle",
            message: `A file ${component.filepath} already exists. Overwrite it?`,
            initial: false,
        });

        if (!force) {
            return;
        }
    }

    component.create();
    console.log(`${type} generated at ${component.filepath}`);
}

const cmd = createCommand("generate")
    .aliases(["gen", "g"])
    .description("Create a component element.")
    .argument("<type>", `Component type (${COMPONENTS_MAP_KEYS.join(', ')})`)
    .argument("<name>", "Component name.")
    .option("-d, --dry-run", "Prevent the file creation and output the render")
    .option("--use-typescript", "Writes the component in Typescript.")
    .option("--use-jsx", "Creates the component in a JSX/TSX file.")
    .option("--generate-style", "Creates a style file for the component.")
    .option("--flat", "Prevent the creation of a folder for the component.")
    .option("-f, --force", "Force the component generation, ignoring potential file conflict.")
    .option("-p, --path <path>", "Path where the component should generate.")
    .option("-l, --generate-lazy", "Creates a lazy version of the component.")
    .option("-P, --preprocessor [preprocessor]", "Select the style preprocessor for the component.")
    .action(handler);

export default cmd;