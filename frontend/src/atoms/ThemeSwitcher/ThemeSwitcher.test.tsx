import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeSwitcher } from './ThemeSwitcher';

describe('ThemeSwitcher', () => {
  it('toggles dark class on click', () => {
    render(<ThemeSwitcher />);
    const btn = screen.getByRole('button');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    fireEvent.click(btn);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    fireEvent.click(btn);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
