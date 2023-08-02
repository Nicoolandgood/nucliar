import { COMPONENTS_TEMPLATES, ComponentType } from "../constants/component";
import { Component } from "./component";

export function componentFactory(componentType: ComponentType | string, name: string, isTs?: boolean, isJSX?: boolean, path?: string) {
    const template = COMPONENTS_TEMPLATES[componentType as ComponentType];
    return new Component(name, isTs, isJSX, template, path);
}
