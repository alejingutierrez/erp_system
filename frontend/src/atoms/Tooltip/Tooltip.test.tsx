import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('shows and hides on hover', () => {
    render(
      <Tooltip content="Info">
        <button>Trigger</button>
      </Tooltip>
    );
    const trigger = screen.getByRole('button');
    fireEvent.mouseEnter(trigger);
    expect(screen.getByText('Info')).toBeInTheDocument();
    fireEvent.mouseLeave(trigger);
    expect(screen.queryByText('Info')).not.toBeInTheDocument();
  });

  it('shows on focus', () => {
    render(
      <Tooltip content="More">
        <button>Focus me</button>
      </Tooltip>
    );
    const trigger = screen.getByRole('button');
    fireEvent.focus(trigger);
    expect(screen.getByText('More')).toBeInTheDocument();
  });

  it('applies placement classes', () => {
    render(
      <Tooltip content="Hi" placement="bottom">
        <button>Hi</button>
      </Tooltip>
    );
    const trigger = screen.getByRole('button');
    fireEvent.mouseEnter(trigger);
    const tip = screen.getByRole('tooltip');
    expect(tip.className).toContain('top-full');
  });
});
