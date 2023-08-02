import { classComponent, funcComponent, hoComponent, hookComponent } from "../templates/component";

export enum ComponentType {
    DEFAULT = "component",
    CLASS = "class-component",
    HOC = "hoc",
    HOOK = "hook",
}

export const COMPONENT_TYPES = Object.values(ComponentType);

export const COMPONENTS_TEMPLATES = {
    [ComponentType.CLASS]: classComponent,
    [ComponentType.DEFAULT]: funcComponent,
    [ComponentType.HOC]: hoComponent,
    [ComponentType.HOOK]: hookComponent,
}
