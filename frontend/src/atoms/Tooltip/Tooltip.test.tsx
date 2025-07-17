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

  it('respects placement', () => {
    render(
      <Tooltip content="Hi" placement="bottom">
        <button>Hi</button>
      </Tooltip>
    );
    const trigger = screen.getByRole('button');
    fireEvent.mouseEnter(trigger);
    const arrow = screen.getByRole('tooltip').querySelector('span');
    expect(arrow?.className).toContain('-top-1');
  });
});
