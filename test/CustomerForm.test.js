import React from 'react';
import { initializeReactContainer, render, element, form } from '../test/reactTestExtensions';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  // Test for a form rendering
  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form()).not.toBeNull();
  });

  // Test for rendering the first name input field
  it('renders a first name input field', () => {
    render(<CustomerForm />);
    const field = form().elements.firstName;
    expect(field).not.toBeNull();
    expect(field.tagName).toEqual('INPUT');
    expect(field.type).toBe('text');
  });

  it('includes the existing value for the first name', () => {
    const customer = { firstName: 'Ashley' };
    render(<CustomerForm original={customer} />);
    const field = form().elements.firstName;
    expect(field.value).toEqual('Ashley');
  });
})
