import React from 'react';
import { initializeReactContainer, render, element, form } from '../test/reactTestExtensions';
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
