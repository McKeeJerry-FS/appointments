import { toContainText } from "./toContainText";

describe("toContainText", () => {
    it("returns pass is true when text is found in a given DOM element", () => {
        const domElement = {
            textContent: "some text"
        };
        const result = toContainText(domElement, "some text");
        expect(result.pass).toBe(true);
    });
});