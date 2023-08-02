import { classComponent, funcComponent, hoComponent, hookComponent } from "../templates/component";

export enum ComponentType {
    FUNCTIONAL = "component",
    CLASS = "class-component",
    HOC = "hoc",
    HOOK = "hook",
}

export const COMPONENT_TYPES = Object.values(ComponentType);

export const COMPONENTS_TEMPLATES = {
    [ComponentType.CLASS]: classComponent,
    [ComponentType.FUNCTIONAL]: funcComponent,
    [ComponentType.HOC]: hoComponent,
    [ComponentType.HOOK]: hookComponent,
}
