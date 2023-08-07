import { StyleLanguage } from "../../src/constants/file";
import { Style } from "../../src/core/style";

describe("Style file class tests", () => {

    const defaultName = "LeStyleCestChic";

    it("should create a CSS file instance.", () => {
        const s = new Style(defaultName);

        expect(s.extension).toBe("css");
    });

    it("should create a CSS module file instance.", () => {
        const s = new Style(defaultName, undefined, true);

        expect(s.extension).toBe("module.css");
    });

    it("should create a LESS file instance.", () => {
        const s = new Style(defaultName, StyleLanguage.LESS);

        expect(s.extension).toBe("less");
    });

    it("should create a LESS module file instance.", () => {
        const s = new Style(defaultName, StyleLanguage.LESS, true);

        expect(s.extension).toBe("module.less");
    });

    it("should create a SASS file instance.", () => {
        const s = new Style(defaultName, StyleLanguage.SASS);

        expect(s.extension).toBe("scss");
    });

    it("should create a SASS module file instance.", () => {
        const s = new Style(defaultName, StyleLanguage.SASS, true);

        expect(s.extension).toBe("module.scss");
    });

    it("should set empty extension for unknown types.", () => {
        const s = new Style(defaultName, "" as StyleLanguage);
        const s2 = new Style(defaultName, "" as StyleLanguage, true);

        expect(s.extension).toBe('');
        expect(s2.extension).toBe('');
    });
    
})