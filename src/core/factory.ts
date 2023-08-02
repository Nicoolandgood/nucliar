import { ComponentType } from "../constants/component";
import { ClassComponent, Component, FuncComponent, HoComponent, HookComponent, ProviderComponent } from "./component";

export function componentFactory(componentType: ComponentType | string, name: string, isTs?: boolean, useJSX?: boolean, path?: string) {
    
    switch(componentType) {
        case ComponentType.FUNCTIONAL:
            return new FuncComponent(name, isTs, useJSX, path);
        
        case ComponentType.CLASS:
            return new ClassComponent(name, isTs, useJSX, path);

        case ComponentType.HOC:
            return new HoComponent(name, isTs, useJSX, path);

        case ComponentType.HOOK:
            return new HookComponent(name, isTs, useJSX, path);

        case ComponentType.PROVIDER:
            return new ProviderComponent(name, isTs, useJSX, path);

        default:
            return new Component(name, isTs, useJSX, "", path);
    }
}
