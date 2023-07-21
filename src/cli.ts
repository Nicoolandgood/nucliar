import { program } from "@commander-js/extra-typings";
import commandsRegister from "./commands";

/**
 * Entrypoint of the CLI. Custom arguments can be given.
 */
export function main(argv: string[] = process.argv) {
    program
        .name(process.env.npm_package_name!)
        .description(process.env.npm_package_description!)
        .version(process.env.npm_package_version!);

    commandsRegister
        .forEach(cmd => program.addCommand(cmd));

    program.parse(argv);
}

if (typeof require !== 'undefined' && require.main === module) {
    // This code runs only if the file is directly executed.
    // Executing this file is only for test purpose.
    main();
}
