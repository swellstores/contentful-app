import React from 'react';
import { render, screen } from '@testing-library/react';
import Product from './product.js';

test('shows the children when the checkbox is checked', () => {
  const product = {
    id: 1,
    variants: {
        results: [
          {name: 'variant', id: '1'},
          {name: 'another_variant', id: '2'},
        ]
    }
  }
  render(<Product key={product.id} product={product} value={'1'} variantSelection />)
  const selectElement = screen.getByRole('combobox');
  const options = screen.getAllByRole('option');
  expect(options.length).toBe(2); 
})