import { Command } from "@commander-js/extra-typings";
import generate from "./generate";

const commandsRegister: Command<any, any>[] = [
    generate,
]

export default commandsRegister;