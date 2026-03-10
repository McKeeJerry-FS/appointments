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
})
