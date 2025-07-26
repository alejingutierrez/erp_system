import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PageHeader } from './PageHeader';
import { Button } from '@/atoms/Button';

const breadcrumbs = [
  { label: 'Home', href: '#' },
  { label: 'Products' },
];

describe('PageHeader', () => {
  it('renders breadcrumbs and title', () => {
    render(<PageHeader title="Products" breadcrumbs={breadcrumbs} />);
    expect(screen.getByRole('heading', { name: 'Products' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('renders actions', () => {
    render(
      <PageHeader
        title="Products"
        breadcrumbs={breadcrumbs}
        actions={<Button>New</Button>}
      />,
    );
    expect(screen.getByRole('button', { name: 'New' })).toBeInTheDocument();
  });

  it('matches mobile snapshot', () => {
    const { asFragment } = render(
      <PageHeader
        title="Mobile"
        breadcrumbs={breadcrumbs}
        actions={<Button>New</Button>}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
