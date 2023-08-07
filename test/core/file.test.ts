import { GeneratedFile } from "../../src/core/file";


describe("GeneratedFile class tests", () => {

    const defaultName = "TheManWhoSoldTheWorld";
    const defaultPath = "/etc/temp/";

    it("should create a generated file instance.", () => {
        const f = new GeneratedFile(defaultName, "");

        expect(f.name).toBe(defaultName);
        expect(f.computedName).toBe(defaultName);
        expect(f.extension).toBe("");
        expect(f.filename).toBe(defaultName);
        expect(f.path).toBe(".");
        expect(f.template).toBe("");
        expect(f.linkedFiles).toEqual([]);

        f.setPath(defaultPath);

        expect(f.path).toBe(defaultPath);
        expect(f.filepath).toBe(`${defaultPath}${defaultName}`);
    });

    it("should render content based on template.", () => {
        const fileTemplate = "{{it.name}} must be destroyed."
        const f = new GeneratedFile(defaultName, fileTemplate);
        
        expect(f.render()).toBe(`${defaultName} must be destroyed.`);
    });

    it("should extend correctly.", () => {
        class MarkDownFile extends GeneratedFile {

            constructor(name: string) {
                super(name, "#Hi mom");
            }

            get extension(): string {
                return "md";
            }
        };

        const m = new MarkDownFile(defaultName);

        expect(m.extension).toBe('md');
        expect(m.template).toBe("#Hi mom");
        expect(m.filename).toBe(`${defaultName}.md`);
    });

    it("should link files correctly.", () => {
        const filesTemplate = "{{it.name}}";
        const f = new GeneratedFile(defaultName, filesTemplate, defaultPath);
        const f2Name = "TheNowNow";
        const f2 = new GeneratedFile(f2Name, filesTemplate);
        const f3Name = "BillieJean";
        const f3 = new GeneratedFile(f3Name, filesTemplate);

        // Linking files
        f.linkFiles(f2);
        expect(f2.path).toBe(f.path);
        expect(f.linkedFiles).toContain(f2);
        expect(f.linkedFiles.length).toBe(1);

        f.linkFiles(f3);

        expect(f.linkedFiles).toContain(f2);
        expect(f.linkedFiles).toContain(f3);
        expect(f.linkedFiles.length).toBe(2);

        // Double linking
        f.linkFiles(f3);
        expect(f.linkedFiles).toContain(f2);
        expect(f.linkedFiles).toContain(f3);
        expect(f.linkedFiles.length).toBe(2);

        // Unlinking files
        f.unlinkFile(f2);

        expect(f.linkedFiles).not.toContain(f2);
        expect(f.linkedFiles).toContain(f3);
        expect(f.linkedFiles.length).toBe(1);

        // Loop prevention
        f3.linkFiles(f);
        expect(f3.linkedFiles).not.toContain(f);
    });
})