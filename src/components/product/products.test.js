import React from 'react';
import { render, screen } from '@testing-library/react';
import Product from './product.js';

test('rendering with the previous variant interface, it shows the correct amount of options', () => {
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
  const options = screen.getAllByRole('option');
  expect(options.length).toBe(2); 
})

test('rendering with the new variant interface, it shows the correct amount of options', () => {
  const product = {
    id: 1,
    variants: {
      results: [
      ]
    },
    purchase_options: {
      subscription: {
        plans: [
          [{name: 'variant', id: '1'}],
          [{name: 'another_variant', id: '2'}],
        ]
      }
    }
  }
  render(<Product key={product.id} product={product} value={'1'} variantSelection />)
  const options = screen.getAllByRole('option');
  expect(options.length).toBe(2); 
})

test('rendering with both variant interfaces (old and new), it shows the correct amount of options', () => {
  const product = {
    id: 1,
    variants: {
      results: [
        {name: 'variant_1', id: '1'},
        {name: 'variant_2', id: '2'},
      ]
    },
    purchase_options: {
      subscription: {
        plans: [
          [{name: 'variant_3', id: '3'}],
          [{name: 'variant_4', id: '4'}],
        ]
      }
    }
  }
  render(<Product key={product.id} product={product} value={'1'} variantSelection />)
  const options = screen.getAllByRole('option');
  expect(options.length).toBe(4); 
})
