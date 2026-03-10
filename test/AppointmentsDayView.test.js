import React from "react";
import { act } from "react";
import ReactDOM from "react-dom/client";
import { Appointment, AppointmentsByDay } from "../src/AppointmentsDayView";
import { initializeReactContainer, render, click } from "./reactTestExtensions";

// 'DESCRIBE" defines a test suite, which is simply a set of tests with a given name.
// The first argument is the name odf the unit you are testing, and the second argument is the name of function inside of which you define the test
describe("Appointment", () => {
  const blankCustomer = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  };

  beforeEach(() => {
    initializeReactContainer();
  });

  const appointmentTable = () => {
    return document.querySelector("#appointmentView > table");
  };

  const appointmentHeader = () => {
    return document.querySelector("#appointmentView > h3");
  };
  // 'it' defines a singel test
  // 'it' refers to the noun you used to name your test suite
  it("renders a table", () => {
    render(<Appointment customer={blankCustomer} />);
    expect(appointmentTable()).not.toBeNull();
  });

  it("renders an h3 element", () => {
    render(<Appointment customer={blankCustomer} />);
    expect(appointmentHeader()).not.toBeNull();
  });

  it("renders the customer first name", () => {
    const customer = { firstName: "Ashley" };
    render(<Appointment customer={customer} />);
    // 'expect' is the assertion function that Jest provides to test values
    expect(document.body).toContainText("Ashley");
    // You can read this this expectation in one sentence: "I expect the document.body.textContent to contain the string 'Ashley'". This is the naming convention in Jest tests.
  });
  it("renders another customer's first name", () => {
    const customer = { firstName: "Jordan" };
    render(<Appointment customer={customer} />);
    expect(document.body).toContainText("Jordan");
  });
  // You can now read this test as one complete sentence: "Appointment renders another customer's first name". This is the naming convention in Jest tests.

  // rendering a last name
  it("renders a customer's last name", () => {
    const customer = { lastName: "Smith" };
    render(<Appointment customer={customer} />);
    expect(appointmentTable()).toContainText("Smith");
  });

  it("renders another customer's last name", () => {
    const customer = { lastName: "Johnson" };
    render(<Appointment customer={customer} />);
    expect(appointmentTable()).toContainText("Johnson");
  });

  // rendering a phone number
  it("renders a customer's phone number", () => {
    const customer = { phoneNumber: "(123) 456-7890" };
    render(<Appointment customer={customer} />);
    expect(appointmentTable()).toContainText("(123) 456-7890");
  });

  it("renders another customer's phone number", () => {
    const customer = { phoneNumber: "(987) 654-3210" };
    render(<Appointment customer={customer} />);
    expect(appointmentTable()).toContainText("(987) 654-3210");
  });

  // rendering a stylist
  it("renders a customer's stylist", () => {
    render(<Appointment customer={blankCustomer} stylist="Sam" />);
    expect(appointmentTable()).toContainText("Sam");
  });

  it("renders another customer's stylist", () => {
    render(<Appointment customer={blankCustomer} stylist="Alex" />);
    expect(appointmentTable()).toContainText("Alex");
  });

  //rendering a service
  it("renders a customer's service", () => {
    render(
      <Appointment customer={blankCustomer} stylist="Sam" service="Cut" />,
    );
    expect(appointmentTable()).toContainText("Cut");
  });

  it("renders another customer's service", () => {
    render(
      <Appointment customer={blankCustomer} stylist="Sam" service="Colour" />,
    );
    expect(appointmentTable()).toContainText("Colour");
  });

  // renders a note on the customer's appointment
  it("renders a customer's notes", () => {
    render(
      <Appointment
        customer={blankCustomer}
        stylist="Sam"
        service="Cut"
        notes="This is a note about the customer's appointment."
      />,
    );
    expect(appointmentTable()).toContainText(
      "This is a note about the customer's appointment.",
    );
  });

  it("renders another customer's notes", () => {
    render(
      <Appointment
        customer={blankCustomer}
        stylist="Sam"
        service="Cut"
        notes="This is another note about the customer's appointment."
      />,
    );
    expect(appointmentTable()).toContainText(
      "This is another note about the customer's appointment.",
    );
  });

  // renders a time as the appointment heading
  it("renders the appointment time as the heading", () => {
    const today = new Date();
    const appointmentTime = today.setHours(14, 0);
    render(
      <Appointment
        customer={blankCustomer}
        stylist="Sam"
        service="Cut"
        notes="This is a note about the customer's appointment."
        startsAt={appointmentTime}
      />,
    );
    expect(appointmentHeader()).toContainText("Today's appointment at 14:00");
  });
});

// AppointmentsByDay
describe("AppointmentsByDay", () => {
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

  beforeEach(() => {
    initializeReactContainer();
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
    render(<AppointmentsByDay appointments={twoAppointments} />);
    const listChildren = document.querySelectorAll("li");
    expect(listChildren).toHaveLength(2);
  });
  // renders a human readable time for each appointment
  it("renders a time for each appointment", () => {
    render(<AppointmentsByDay appointments={twoAppointments} />);
    const listChildren = document.querySelectorAll("li");
    expect(listChildren[0]).toContainText("12:00");
    expect(listChildren[1]).toContainText("13:00");
  });
  // renders a message when there are no appointments
  it("renders a message saying there are no appointments today", () => {
    render(<AppointmentsByDay appointments={[]} />);
    expect(document.body).toContainText(
      "There are no appointments scheduled for today.",
    );
  });

  // selects the first appointment by default
  it("selects the first appointment by default", () => {
    render(<AppointmentsByDay appointments={twoAppointments} />);
    expect(document.body).toContainText("Ashley");
  });
  // has a button to select each li
  it("has a button element in each li", () => {
    render(<AppointmentsByDay appointments={twoAppointments} />);
    const buttons = document.querySelectorAll("li > button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toContainText("12:00");
  });

  // renders another appointment when selected
  it("renders another appointment when selected", () => {
    render(<AppointmentsByDay appointments={twoAppointments} />);
    const button = document.querySelectorAll("button")[1];
    act(() => button.click());
    expect(document.body).toContainText("Jordan");
  });

  // adds a toggle class to the selected appointment's button
  it("adds a toggle class to the selected appointment's button", () => {
    render(<AppointmentsByDay appointments={twoAppointments} />);
    const button = document.querySelectorAll("button")[1];
    click(button);
    expect(button.className).toContain("toggled");
  });

  // removes the toggle class from the previously selected appointment's button
  it("removes the toggle class from the previously selected appointment's button", () => {
    render(<AppointmentsByDay appointments={twoAppointments} />);
    const buttons = document.querySelectorAll("button");
    click(buttons[1]);
    expect(buttons[0].className).not.toContain("toggled");
  });
});
