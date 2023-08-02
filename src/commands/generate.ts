import { createCommand } from "@commander-js/extra-typings";
import { prompt } from 'enquirer';
import { join, normalize } from "path";
import { existsSync } from "fs";

import { LazyComponent } from "../core/component";
import { componentFactory } from "../core/factory";
import { Style } from "../core/style";

import { COMPONENT_TYPES, ComponentType } from "../constants/component";
import { STYLE_LANGAUGE_VALUES, StyleLanguage } from "../constants/file";

import { loadConfigurationFile } from "../utils/config";
import { capitalize, getFileContent } from "../utils/misc";
import { NucliarError } from "../utils/errors";
import { getWarnText, logSuccess } from "../utils/logs";

import { GenerateOptions } from "../interfaces/commands";

import { funcComponent } from "../templates/component";



async function handler(type: string, name: string, options: GenerateOptions) {

    const { types, ...configOptions } = await loadConfigurationFile();
    const typeOptions = types[type] ?? {};
    options = { ...configOptions, ...typeOptions, ...options };

    const isVanilla = COMPONENT_TYPES.includes(type as unknown as ComponentType);  // True if the type is included in nucliar.
    const isCustom = (type in types) && !isVanilla;

    if(!isVanilla && !isCustom) {
        // Not valid type
        const validTypes = new Set([...Object.keys(types), ...COMPONENT_TYPES]);
        throw new NucliarError(`"${type}" is not a valid type. Possible types are: ${[...validTypes].join(', ')}.`);
    }

    const component = componentFactory(type, name, options.useTypescript, options.useJsx);

    if(isCustom) {
        // Custom type handling
        if(options.template && !existsSync(options.template)) {
            throw new NucliarError(`The template file ${options.template} does not exist.`);
        }
        const customTemplate = options.template? (await getFileContent(options.template)): funcComponent;
        component.setTemplate(customTemplate);
    }

    if(options.preprocessor && options.generateStyle) {
        const preprocessor = (typeof options.preprocessor == "boolean"? StyleLanguage.CSS: options.preprocessor) as StyleLanguage;

        if(!STYLE_LANGAUGE_VALUES.includes(preprocessor))
            throw new NucliarError(`"${preprocessor}" is not a valid style preprocessor. Possible values are: ${STYLE_LANGAUGE_VALUES.join(', ')}.`)
        
        const style = new Style(name, preprocessor as StyleLanguage, options.useCssModules);
        component.linkFiles(style);        
    }

    if(options.generateLazy) {
        const lazy = new LazyComponent(name, options.useTypescript, options.useJsx);
        component.linkFiles(lazy);
    }

    if (options.path) {
        const normalizedPath = normalize(options.path);
        component.setPath(join(normalizedPath, component.path));
    }

    if (!options.flat) {
        component.setPath(join(component.path, component.name));
    }
    
    if (options.dryRun) {
        console.log(component.renderAll("\n\n"));
        return;
    }

    if (!options.force && existsSync(component.filepath)) {
        const { force } = await prompt<any>({
            name: "force",
            type: "toggle",
            message: getWarnText(`A file ${component.filepath} already exists. Overwrite it?`),
            initial: false,
        });

        if (!force) {
            return;
        }
    }

    component.createAll();
    logSuccess(`${capitalize(type)} generated in ${component.filepath}`);
}

const cmd = createCommand("generate")
    .aliases(["gen", "g"])
    .description("Create a component element.")
    .argument("<type>", "Component type.")
    .argument("<name>", "Component name.")
    .option("-d, --dry-run", "Prevent the file creation and output the render")
    .option("--use-typescript", "Writes the component in Typescript.")
    .option("--use-jsx", "Creates the component in a JSX/TSX file.")
    .option("--use-css-modules", "Creates style files as css modules.")
    .option("--generate-style", "Creates a style file for the component.")
    .option("--flat", "Prevent the creation of a folder for the component.")
    .option("-f, --force", "Force the component generation, ignoring potential file conflict.")
    .option("-p, --path <path>", "Path where the component should generate.")
    .option("-l, --generate-lazy", "Creates a lazy version of the component.")
    .option("-P, --preprocessor [preprocessor]", "Select the style preprocessor for the component.")
    .action(handler);

export default cmd;