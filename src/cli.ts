import { program } from "@commander-js/extra-typings";
import pkg from '../package.json';
import commandsRegister from "./commands";

/**
 * Entrypoint of the CLI. Custom arguments can be given.
 */
function main(argv: string[] = process.argv) {
    program
        .name(pkg.name)
        .description(pkg.description)
        .version(pkg.version);

    commandsRegister
        .forEach(cmd => program.addCommand(cmd));

    program.parse(argv);
}

if (typeof require !== 'undefined' && require.main === module) {
    // This code runs only if the file is directly executed.
    // Executing this file is only for test purpose.
    main();
}

export default main;