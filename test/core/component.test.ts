import { 
    Component, 
    LazyComponent,
} from '../../src/core/component';
import { TEST_COMPONENT_NAMES, TEST_TEMPLATE, TEST_TEMPLATE_RESULT } from '../setup/constants';
import { Style } from '../../src/core/style';

describe("Component classes tests", () => {

    const defaultName = "LoremIpsum";

    it("should create a component instance with correct name and extension.", () => {
        let c = new Component(defaultName);
            
        expect(c.extension).toBe("js");
        expect(c.template).toBe("");

        c = new Component(defaultName, true);
        expect(c.extension).toBe("ts");

        c = new Component(defaultName, false, true);
        expect(c.extension).toBe("jsx");

        c = new Component(defaultName, true, true);
        expect(c.extension).toBe("tsx");

        TEST_COMPONENT_NAMES.forEach((camelName, testName) => {
            c = new Component(testName);
            
            expect(c.name).toBe(testName);
            expect(c.computedName).toBe(camelName);
        });

    });

    it("should create a component instance with some style files.", () => {
        const c = new Component(defaultName);
        const s = new Style(defaultName);
        c.linkFiles(s);

        expect(c.styles).toContain(s);
        expect(c.styles.length).toBe(1);

        const l = new LazyComponent(defaultName);
        expect(c.styles).not.toContain(l);
        expect(c.styles.length).toBe(1);

        const s2 = new Style(defaultName);
        c.linkFiles(s2);
        expect(c.styles).toContain(s2);
        expect(c.styles.length).toBe(2);
    });

    it("should create a component and render its template.", () => {
        const c = new Component(defaultName);
        c.setTemplate(TEST_TEMPLATE);

        expect(c.render()).toBe(TEST_TEMPLATE_RESULT(c.computedName));
    });
});