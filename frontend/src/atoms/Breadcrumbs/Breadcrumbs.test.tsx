import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Breadcrumbs from './Breadcrumbs';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'Product' },
];

describe('Breadcrumbs', () => {
  it('renders all items and separators', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Catalog')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(items.length - 1);
  });

  it('renders links for all but the last item', () => {
    render(<Breadcrumbs items={items} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(items.length - 1);
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/catalog');
    expect(screen.queryByRole('link', { name: 'Product' })).toBeNull();
  });

  it('marks the last item as current page', () => {
    render(<Breadcrumbs items={items} />);
    const current = screen.getByText('Product');
    expect(current).toHaveAttribute('aria-current', 'page');
  });
});
