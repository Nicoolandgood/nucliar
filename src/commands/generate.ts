import { createCommand } from "@commander-js/extra-typings";
import { ClassComponent, FuncComponent, HoComponent, HookComponent, LazyComponent, DisplayComponent } from "../core/component";
import { ComponentType } from "../constants/component";
import { StyleLanguage } from "../constants/file";
import { Style } from "../core/style";
import { join } from "path";
import { GenerateOptions } from "../interfaces/commands";

const COMPONENTS_MAP = {
    [ComponentType.DEFAULT] : FuncComponent,
    [ComponentType.CLASS]: ClassComponent,
    [ComponentType.HOC]: HoComponent,
    [ComponentType.HOOK]: HookComponent,
};

const COMPONENTS_MAP_KEYS = Object.keys(COMPONENTS_MAP);

async function handler(type: string, name: string, options: GenerateOptions) {


    if(!type || !(type in COMPONENTS_MAP)){
        throw Error("Not valid type.");
    }

    const _Component = COMPONENTS_MAP[type as ComponentType];
    
    const component = new _Component(name, options.ts, options.jsx);

    if (component instanceof DisplayComponent) {

        if(options.preprocessor && options.style) {
            const preprocessor = typeof options.preprocessor == "boolean"? StyleLanguage.CSS: options.preprocessor;
            
            const style = new Style(name, preprocessor as StyleLanguage);
            component.setStyle(style);
        }
    
        if(options.lazy) {
            const lazy = new LazyComponent(name, options.ts, options.jsx);
            component.setLazy(lazy);
        }
    
        component.setPath(join(component.path, component.name));
    }
    
    if (options.dryRun) {
        console.log(component.toString());
        return;
    }    

    component.create();
}

const cmd = createCommand("generate")
    .aliases(["gen", "g"])
    .description("Create a component element.")
    .argument("<type>", `Component type (${COMPONENTS_MAP_KEYS.join(', ')})`)
    .argument("<name>", "Component name.")
    .option("-d, --dry-run", "Prevent the file creation and output the render", false)
    .option("--ts", "Writes the component in Typescript.", false)
    .option("--jsx", "Creates the component in a JSX/TSX file.", false)
    .option("--no-style", "Prevent the creation of any style file.")
    .option("-l, --lazy", "Creates a lazy version of the component.", false)
    .option("-p, --preprocessor [preprocessor]", "Select the style preprocessor for the component.", StyleLanguage.CSS)
    .action(handler);

export default cmd;