import React from 'react';
import { initializeReactContainer, render, element, form, field } from '../test/reactTestExtensions';
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
    expect(label.textContent).toMatch(/first\s*name/i);
  });
})
