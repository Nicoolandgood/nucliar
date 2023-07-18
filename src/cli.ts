import { program } from "@commander-js/extra-typings";
import pkg from '../package.json';
import commandsRegister from "./commands";

program
    .name(pkg.name)
    .description(pkg.description)
    .version(pkg.version);

commandsRegister
    .forEach(cmd => program.addCommand(cmd));

program.parse();
