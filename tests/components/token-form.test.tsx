import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { TokenForm } from '../../src/components/token-form';

const formProps = {
  formTitle: 'title',
  tokenToEdit: {},
};

describe('Test TokenForm component', () => {
  it('should render the custom title', () => {
    const { formTitle } = formProps;
    render(<TokenForm formTitle={formTitle} />, { wrapper: Router });

    expect(screen.getByText(formTitle)).toBeInTheDocument();
  });

  it('will have the link to back home page', () => {
    render(<TokenForm formTitle={formProps.formTitle} />, { wrapper: Router });

    const backButtonLink = screen.getByText('back');
    expect(backButtonLink).toHaveAttribute('href', '/');
  });

  describe('add token', () => {
    it('should call localStorage setItem', () => {
      const { formTitle } = formProps;
      render(<TokenForm formTitle={formTitle} />, { wrapper: Router });

      const storedTokens: any = localStorage.getItem('tokens');
      expect(storedTokens).toBeFalsy();

      const tokenNameInput = screen.getByTestId('token-name-input');
      const balanceInput = screen.getByTestId('balance-input');

      const newToken = { name: 'klv', balance: '1000' };
      fireEvent.change(tokenNameInput, { target: { value: newToken.name } });
      fireEvent.change(balanceInput, { target: { value: newToken.balance } });
      fireEvent.click(screen.getByText('save'));

      // TODO: Check if token was added to localStorage
    });

    it('should not exist button to delete', () => {
      render(<TokenForm formTitle={formProps.formTitle} />, {
        wrapper: Router,
      });

      expect(screen.queryByText('remove')).not.toBeInTheDocument();
    });
  });

  describe('edit token', () => {
    const tokenToEdit = { id: 1, name: 'tkn', balance: 10500 };
    beforeEach(() => {
      formProps.tokenToEdit = tokenToEdit;
    });

    it('should start form with inputs filled', () => {
      render(
        <TokenForm formTitle={formProps.formTitle} tokenToEdit={tokenToEdit} />,
        {
          wrapper: Router,
        }
      );

      expect(screen.getByDisplayValue(tokenToEdit.name)).toBeInTheDocument();
      expect(screen.getByDisplayValue(tokenToEdit.balance)).toBeInTheDocument();
    });

    it('should edit token in the localStorage', () => {
      localStorage.setItem('tokens', JSON.stringify([tokenToEdit]));

      render(
        <TokenForm formTitle={formProps.formTitle} tokenToEdit={tokenToEdit} />,
        {
          wrapper: Router,
        }
      );

      // TODO: Check if token was edited in the localStorage
    });

    it('should exist button to delete', () => {
      render(
        <TokenForm formTitle={formProps.formTitle} tokenToEdit={tokenToEdit} />,
        {
          wrapper: Router,
        }
      );

      expect(screen.getByText('remove')).toBeInTheDocument();
    });
  });
});
