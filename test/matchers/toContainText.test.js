import { toContainText } from "./toContainText";

describe("toContainText matcher", () => {
  const stripTerminalColor = (text) => text.replace(/\x1B\[\d+m/g, "");

  it("returns pass is true when text is found in a given DOM element", () => {
    const domElement = {
      textContent: "some text",
    };
    const result = toContainText(domElement, "some text");
    expect(result.pass).toBe(true);
  });

  it("returns pass is false when text is not found in a given DOM element", () => {
    const domElement = {
      textContent: "",
    };
    const result = toContainText(domElement, "some text");
    expect(result.pass).toBe(false);
  });

  it("returns a message that contains the source line if there is no match", () => {
    const domElement = { textContent: "" };
    const result = toContainText(domElement, "some text");
    expect(stripTerminalColor(result.message())).toContain(
      `expect(container).toContainText("some text")`,
    );
  });

  it("returns a message that contains the source line if negated match", () => {
    const domElement = { textContent: "text to find" };
    const result = toContainText(domElement, "text to find");
    expect(stripTerminalColor(result.message())).toContain(
      `expect(container).not.toContainText("text to find")`,
    );
  });

  it("returns a message that contains the actual text", () => {
    const domElement = { textContent: "text to find" };
    const result = toContainText(domElement, "text to find");
    expect(stripTerminalColor(result.message())).toContain(
      `Actual text: "text to find"`,
    );
  });
});
