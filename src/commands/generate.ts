import { createCommand } from "@commander-js/extra-typings";
import { Component } from "../core/component";

async function handler(name: string) {
    const el = new Component(name, false, true);
    el.create();
}

const cmd = createCommand("generate")
    .alias("gen")
    .description("Create an element.")
    .argument("<name>")
    .action(handler);

export default cmd;