import { Command } from "@commander-js/extra-typings";
import generate from "./generate";
import init from './init';

const commandsRegister: Command<any, any>[] = [
    generate, init,
]

export default commandsRegister;