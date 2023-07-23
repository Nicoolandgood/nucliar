import { program } from "@commander-js/extra-typings";
import commandsRegister from "./commands";
import { getPackageJSON } from "./utils/misc";
import { errorHandler } from "./utils/errors";

/**
 * Entrypoint of the CLI. Custom arguments can be given.
 */
export async function main(argv: string[] = process.argv) {   
    
    const { name, description, version } = getPackageJSON();

    program
        .name(name)
        .description(description)
        .version(version);

    commandsRegister
        .forEach(cmd => program.addCommand(cmd));

    program
        .parseAsync(argv)
        .catch(errorHandler);
}

if (typeof require !== 'undefined' && require.main === module) {
    // This code runs only if the file is directly executed.
    // Executing this file is only for test purpose.
    main();
}
