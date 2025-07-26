import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ActivityFeed, type Activity } from './ActivityFeed';

const items: Activity[] = [
  { id: '1', date: new Date('2025-07-04T09:00:00'), content: 'A' },
  { id: '2', date: new Date('2025-07-05T10:00:00'), content: 'B' },
  { id: '3', date: new Date('2025-07-05T12:00:00'), content: 'C' },
];

describe('ActivityFeed', () => {
  it('renders dates ordered desc', () => {
    const { container } = render(<ActivityFeed items={items} />);
    const headers = container.querySelectorAll('li > time');
    expect(headers[0].textContent).toBe('05/07/2025');
    expect(headers[1].textContent).toBe('04/07/2025');
  });
});
