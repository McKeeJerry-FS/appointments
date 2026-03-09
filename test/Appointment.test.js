import React from "react";
import { act } from "react";
import ReactDOM from "react-dom/client";
import { Appointment } from "../src/Appointment";

// 'DESCRIBE" defines a test suite, which is simply a set of tests with a given name.
// The first argument is the name odf the unit you are testing, and the second argument is the name of function inside of which you define the test
describe("Appointment", () => {
    // 'it' defines a singel test
    // 'it' refers to the noun you used to name your test suite
    it("renders the customer first name", () => {
        const customer = { firstName: "Ashley" };
        const component = (
            <Appointment customer={customer} />
        );
        const container = document.createElement("div");
        document.body.appendChild(container);
        act(() => {
            ReactDOM.createRoot(container).render(component);
        });
        // 'expect' is the assertion function that Jest provides to test values
        expect(document.body.textContent).toContain("Ashley");
        // You can read this this expectation in one sentence: "I expect the document.body.textContent to contain the string 'Ashley'". This is the naming convention in Jest tests.
    });
    it("renders another customer's first name", () => {
      const customer = { firstName: "Jordan" };
      const component = <Appointment customer={customer} />;
      const container = document.createElement("div");
      document.body.appendChild(container);
      act(() => {
        ReactDOM.createRoot(container).render(component);
      });
      expect(document.body.textContent).toContain("Jordan");
      
    });
    // You can now read this test as one complete sentence: "Appointment renders another customer's first name". This is the naming convention in Jest tests.
});