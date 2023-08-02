import { classComponent, funcComponent, hoComponent, hookComponent } from "../templates/component";

export enum ComponentType {
    FUNCTIONAL = "component",
    CLASS = "class-component",
    HOC = "hoc",
    HOOK = "hook",
    PROVIDER = "provider",
}

export const COMPONENT_TYPES = Object.values(ComponentType);
