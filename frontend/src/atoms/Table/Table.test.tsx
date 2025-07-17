import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Table } from './Table';

const basicTable = (
  <Table>
    <thead>
      <tr>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Ana</td>
      </tr>
    </tbody>
  </Table>
);

describe('Table', () => {
  it('renders a table element', () => {
    render(basicTable);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('applies striped variant classes', () => {
    render(
      <Table variant="striped">
        <tbody>
          <tr><td>1</td></tr>
        </tbody>
      </Table>,
    );
    const table = screen.getByRole('table');
    expect(table.className).toContain('nth-child(even)');
  });

  it('renders caption when provided', () => {
    render(
      <Table caption="info">
        <tbody></tbody>
      </Table>
    );
    expect(screen.getByText('info')).toBeInTheDocument();
  });
});
