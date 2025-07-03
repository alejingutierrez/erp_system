import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders the main heading', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const heading = screen.getByRole('heading', { name: /Home/i });
    expect(heading).toBeInTheDocument();
  });
});
