import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tooltip } from './Tooltip';

function Trigger() {
  return <button>Trigger</button>;
}

describe('Tooltip', () => {
  it('shows tooltip on hover and hides on mouse leave', () => {
    render(
      <Tooltip content="Info">
        <Trigger />
      </Tooltip>,
    );
    const trigger = screen.getByRole('button', { name: /trigger/i });
    fireEvent.mouseEnter(trigger);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    fireEvent.mouseLeave(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on focus and hides on blur', () => {
    render(
      <Tooltip content="Help">
        <Trigger />
      </Tooltip>,
    );
    const trigger = screen.getByRole('button', { name: /trigger/i });
    fireEvent.focus(trigger);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    fireEvent.blur(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('applies placement classes', () => {
    render(
      <Tooltip content="Text" placement="bottom">
        <Trigger />
      </Tooltip>,
    );
    const trigger = screen.getByRole('button');
    fireEvent.mouseEnter(trigger);
    const tip = screen.getByRole('tooltip');
    expect(tip.className).toContain('top-full');
  });
});
