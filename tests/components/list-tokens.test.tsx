import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ListTokens } from '../../src/components/list-tokens';
import { TokenProps } from '../../src/@types/sharedTypes';

afterEach(() => localStorage.clear());

describe('Test ListTokens component', () => {
  it('should render empty list message', () => {
    render(<ListTokens />, { wrapper: Router });

    expect(screen.getByTestId('empty-list-message')).toBeInTheDocument();
  });

  it('should render list tokens', () => {
    const tokens: TokenProps[] = [];
    for (let i = 0; i < 2; i += 1) {
      tokens.push({ id: i, name: `TKN-${i}`, balance: 1000 });
    }
    localStorage.setItem('tokens', JSON.stringify(tokens));

    render(<ListTokens />, { wrapper: Router });
    expect(screen.queryByTestId('empty-list-message')).not.toBeInTheDocument();

    tokens.forEach((token) =>
      expect(screen.queryByTestId(`token-item-${token.id}`))
    );
  });
});
