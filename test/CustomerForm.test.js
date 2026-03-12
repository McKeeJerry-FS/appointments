import React from 'react';
import { initializeReactContainer, render, element, form, field, click } from '../test/reactTestExtensions';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
  const blankCustomer = {
    firstName: '',
  };
  
  beforeEach(() => {
    initializeReactContainer();
  });

  // Test for a form rendering
  it('renders a form', () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(form()).not.toBeNull();
  });

  // Test for rendering the first name input field
  it('renders a first name input field', () => {
    render(<CustomerForm original={blankCustomer} />);
    //const field = form().elements.firstName;
    expect(field('firstName')).not.toBeNull();
    expect(field('firstName').tagName).toEqual('INPUT');
    expect(field('firstName').type).toBe('text');
  });

  it('includes the existing value for the first name', () => {
    const customer = { firstName: 'Ashley' };
    render(<CustomerForm original={customer} />);
    expect(field('firstName').value).toEqual('Ashley');
  });

  it('renders a label for the first name field', () => {
    render(<CustomerForm original={blankCustomer} />);
    const label = element('label[for="firstName"]');
    expect(label).not.toBeNull();
    expect(label.textContent).toMatch("First Name");
  });

  it('renders First Name as the label for the field', () => {
    render(<CustomerForm original={blankCustomer} />);
    const label = element('label[for="firstName"]');
    expect(label).not.toBeNull();
    expect(label.textContent).toBe('First Name');
  });

  it('assigns an id that matches the label id to the first name field', () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(field("firstName").id).toEqual("firstName");
  });

  // These tests will be for submitting the customer Form

  // test for rendering a submit button
  it('renders a submit button', () => {
    render(<CustomerForm original={blankCustomer} />);
    const submitButton = element('button[type="submit"]');
    expect(submitButton).not.toBeNull();
  });

  // test for saving the existing first name when submitted
  // introduces the concept of "assertions" and "expect.hasAssertions()"
  it('saves existing first name when submitted', () => {
    expect.hasAssertions();
    const customer = { firstName: 'Ashley' };
    render(<CustomerForm original={customer}
                         onSubmit={({ firstName }) => {
                           expect(firstName).toEqual('Ashley');
                         }} />);
    const submitButton = element('button[type="submit"]');
    click(submitButton);
  });
});
