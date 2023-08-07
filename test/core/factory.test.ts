import { ComponentType } from '../../src/constants/component';
import { 
    Component, ClassComponent, FuncComponent, HoComponent, 
    HookComponent, ProviderComponent,
} from '../../src/core/component';
import { componentFactory } from '../../src/core/factory'

describe("Component factory tests", () => {

    const defaultName = "HelloEveryNyan";

    it("should create a functional component instance.", () => {
        const c = componentFactory(ComponentType.FUNCTIONAL, defaultName);
        expect(c).toBeInstanceOf(FuncComponent);
    });

    it("should create a class component instance.", () => {
        const c = componentFactory(ComponentType.CLASS, defaultName);
        expect(c).toBeInstanceOf(ClassComponent);
    });

    it("should create a high order component instance.", () => {
        const c = componentFactory(ComponentType.HOC, defaultName);
        expect(c).toBeInstanceOf(HoComponent);
    });

    it("should create a hook component instance.", () => {
        const c = componentFactory(ComponentType.HOOK, defaultName);
        expect(c).toBeInstanceOf(HookComponent);
    });

    it("should create a provider component instance.", () => {
        const c = componentFactory(ComponentType.PROVIDER, defaultName);
        expect(c).toBeInstanceOf(ProviderComponent);
    });

    it("should create a basic component instance from unknown type.", () => {
        const c = componentFactory("im-not-from-here", defaultName);
        expect(c).toBeInstanceOf(Component);
    });
})