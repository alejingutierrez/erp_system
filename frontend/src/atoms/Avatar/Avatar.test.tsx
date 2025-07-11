import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders an image when src is provided', () => {
    render(<Avatar src="avatar.png" alt="Profile" data-testid="avatar" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'avatar.png');
    expect(img).toHaveAttribute('alt', 'Profile');
  });

  it('uses name as alt text by default', () => {
    render(<Avatar src="avatar.png" name="Jane Doe" data-testid="avatar" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Jane Doe');
  });

  it('falls back to initials when no src', () => {
    render(<Avatar name="John Doe" data-testid="avatar" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('applies size variants', () => {
    const { rerender } = render(<Avatar size="sm" data-testid="avatar" />);
    const container = screen.getByTestId('avatar');
    expect(container.className).toContain('h-6');

    rerender(<Avatar size="lg" data-testid="avatar" />);
    expect(container.className).toContain('h-16');
  });

  it('shows initials when image fails to load', () => {
    render(<Avatar src="bad.png" name="Alice" data-testid="avatar" />);
    const img = screen.getByRole('img');
    fireEvent.error(img);
    expect(screen.getByText('A')).toBeInTheDocument();
  });
});
