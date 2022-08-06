import React from 'react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { SubHeader } from '../../src/components/sub-header';

describe('Test SubHeader component', () => {
  it('should render subheader expected with button link', () => {
    render(<SubHeader />, { wrapper: Router });

    const buttonLink = screen.getByText('add token');
    expect(buttonLink).toHaveAttribute('href', '/add-token');
  });

  it('should render subheader expected without button link', () => {
    const route = '/add-token';

    render(
      <MemoryRouter initialEntries={[route]}>
        <SubHeader />
      </MemoryRouter>
    );

    expect(screen.queryByText('add token')).not.toBeInTheDocument();
  });
});
