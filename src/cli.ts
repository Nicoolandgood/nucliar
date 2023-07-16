import { program } from "commander";
import pkg from '../package.json';

program
    .name(pkg.name)
    .description(pkg.description)
    .version(pkg.version);

program.parse();
