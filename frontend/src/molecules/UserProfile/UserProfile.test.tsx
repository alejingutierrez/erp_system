import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  it('renders avatar and name', () => {
    render(<UserProfile userName="John" avatarSrc="avatar.png" />);
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'avatar.png');
  });

  it('falls back to initials when no image', () => {
    render(<UserProfile userName="Jane Doe" avatarSrc={null} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('shows dropdown icon when enabled', () => {
    const { container } = render(<UserProfile userName="John" showDropdownIcon />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('calls onClick handler', () => {
    const handleClick = vi.fn();
    render(<UserProfile userName="John" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
