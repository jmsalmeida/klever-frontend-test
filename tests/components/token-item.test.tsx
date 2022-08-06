import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { TokenItem } from '../../src/components/token-item';
import { TokenProps } from '../../src/@types/sharedTypes';

describe('Test TokenItem component', () => {
  const token: TokenProps = {
    id: Date.now(),
    name: 'KVL',
    balance: 10000,
  };

  it('will have the token information', () => {
    render(
      <TokenItem id={token.id} name={token.name} balance={token.balance} />,
      { wrapper: Router }
    );

    const { name, balance } = token;
    expect(screen.getByText(name)).toBeInTheDocument();

    const balanceElement: HTMLElement = screen.getByTestId('token-balance');
    expect(balanceElement).toBeInTheDocument();

    const balanceElementAsNum = Number(
      balanceElement.innerHTML.replace(/,/g, '')
    );
    expect(balanceElementAsNum).toBe(balance);
  });

  it('will have the link to edit the token', () => {
    render(
      <TokenItem id={token.id} name={token.name} balance={token.balance} />,
      { wrapper: Router }
    );

    const editButtonLink = screen.getByTestId('edit-token-link');
    expect(editButtonLink).toHaveAttribute('href', `/edit-token/${token.id}`);
  });
});
