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

  it('wraps long content', () => {
    const longText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.';
    render(
      <Tooltip content={longText}>
        <button>Trigger</button>
      </Tooltip>
    );
    const trigger = screen.getByRole('button');
    fireEvent.mouseEnter(trigger);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.className).toContain('break-words');
    expect(tooltip.className).toContain('whitespace-pre-line');
  });
});
