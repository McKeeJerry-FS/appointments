import React from "react";
import { act } from "react";
import ReactDOM from "react-dom/client";
import { Appointment, AppointmentsByDay } from "../src/AppointmentsDayView";

let container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.replaceChildren(container);
});
const appointmentTimeOfDay = (startsAt) => {
  const [h, m] = new Date(startsAt).toTimeString().split(":");
  return `${h}:${m}`;
};
// 'DESCRIBE" defines a test suite, which is simply a set of tests with a given name.
// The first argument is the name odf the unit you are testing, and the second argument is the name of function inside of which you define the test
describe("Appointment", () => {
  const render = (component) =>
    act(() => {
      ReactDOM.createRoot(container).render(component);
    });
  // 'it' defines a singel test
  // 'it' refers to the noun you used to name your test suite
  it("renders the customer first name", () => {
    const customer = { firstName: "Ashley" };
    const component = <Appointment customer={customer} />;
    render(<Appointment customer={customer} />);
    // 'expect' is the assertion function that Jest provides to test values
    expect(document.body.textContent).toContain("Ashley");
    // You can read this this expectation in one sentence: "I expect the document.body.textContent to contain the string 'Ashley'". This is the naming convention in Jest tests.
  });
  it("renders another customer's first name", () => {
    const render = (component) =>
      act(() => {
        ReactDOM.createRoot(container).render(component);
      });
    const customer = { firstName: "Jordan" };
    const component = <Appointment customer={customer} />;
    render(<Appointment customer={customer} />);
    expect(document.body.textContent).toContain("Jordan");
  });
  // You can now read this test as one complete sentence: "Appointment renders another customer's first name". This is the naming convention in Jest tests.
});

// AppointmentsByDay
describe("AppointmentsByDay", () => {
  let container;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  });
  const render = (component) =>
    act(() => {
      ReactDOM.createRoot(container).render(component);
    });
  // renders the div with the right Id
  it("renders a div with the right Id", () => {
    render(<AppointmentsByDay appointments={[]} />);
    expect(document.querySelector("div#appointmentsDayView")).not.toBeNull();
  });
  // renders an ol element to display appointments
  it("renders an ol element to display appointments", () => {
    render(<AppointmentsByDay appointments={[]} />);
    const listElement = document.querySelector("ol");
    expect(listElement).not.toBeNull();
  });
  // renders an li element for each appointment
  it("renders an li element for each appointment", () => {
    const today = new Date();
    const twoAppointments = [
      { startsAt: today.setHours(12, 0), customer: { firstName: "Ashley" } },
      { startsAt: today.setHours(13, 0), customer: { firstName: "Jordan" } },
    ];
    render(<AppointmentsByDay appointments={twoAppointments} />);
    const listChildren = document.querySelectorAll("li");
    expect(listChildren).toHaveLength(2);
  });
  // renders a human readable time for each appointment
  it("renders a time for each appointment", () => {
    const today = new Date();
    const twoAppointments = [
      { startsAt: today.setHours(12, 0), customer: { firstName: "Ashley" } },
      { startsAt: today.setHours(13, 0), customer: { firstName: "Jordan" } },
    ];
    render(<AppointmentsByDay appointments={twoAppointments} />);
    const listChildren = document.querySelectorAll("li");
    expect(listChildren[0].textContent).toEqual("12:00");
    expect(listChildren[1].textContent).toEqual("13:00");
  });
  // renders a message when there are no appointments
  it("renders a message saying there are no appointments today", () => {
    render(<AppointmentsByDay appointments={[]} />);
    expect(document.body.textContent).toContain(
      "There are no appointments scheduled for today.",
    );
  });

  // selects the first appointment by default
  it("selects the first appointment by default", () => {
    const today = new Date();
    const twoAppointments = [
      {
        startsAt: today.setHours(12, 0),
        customer: { firstName: "Ashley" },
      },
      {
        startsAt: today.setHours(13, 0),
        customer: { firstName: "Jordan" },
      },
    ];
    render(<AppointmentsByDay appointments={twoAppointments} />);
    expect(document.body.textContent).toContain("Ashley");
  });
  // has a button to select each li
  it("has a button element in each li", () => {
    const today = new Date();
    const twoAppointments = [
      {
        startsAt: today.setHours(12, 0),
        customer: { firstName: "Ashley" },
      },
      {
        startsAt: today.setHours(13, 0),
        customer: { firstName: "Jordan" },
      },
    ];
    render(<AppointmentsByDay appointments={twoAppointments} />);
    const buttons = document.querySelectorAll("li > button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0].type).toEqual("button");
  });

  // renders another appointment when selected
  it("renders another appointment when selected", () => {
    const today = new Date();
    const twoAppointments = [
      {
        startsAt: today.setHours(12, 0),
        customer: { firstName: "Ashley" },
      },
      {
        startsAt: today.setHours(13, 0),
        customer: { firstName: "Jordan" },
      },
    ];
    render(<AppointmentsByDay appointments={twoAppointments} />);
    const button = document.querySelectorAll("button")[1];
    act(() => button.click());
    expect(document.body.textContent).toContain("Jordan");
  });
});
