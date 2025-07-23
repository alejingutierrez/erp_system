import { render, screen, fireEvent } from '@testing-library/react';
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

  it('has a white background', () => {
    render(basicTable);
    const table = screen.getByRole('table');
    expect(table.className).toContain('bg-white');
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

  it('renders rows from data prop', () => {
    render(
      <Table columns={[{ key: 'name', header: 'Name' }]} data={[{ name: 'Ana' }]} />,
    );
    expect(screen.getByText('Ana')).toBeInTheDocument();
  });

  it('sorts data when header is clicked', () => {
    const columns = [
      { key: 'name', header: 'Name', sortable: true },
      { key: 'age', header: 'Age', sortable: true },
    ];
    const data = [
      { name: 'John', age: 30 },
      { name: 'Alice', age: 20 },
    ];

    render(<Table columns={columns} data={data} />);

    const ageHeader = screen.getByText('Age');
    fireEvent.click(ageHeader);
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Alice');
    fireEvent.click(ageHeader);
    expect(screen.getAllByRole('row')[1]).toHaveTextContent('John');
  });

  it('applies hover class when hoverable', () => {
    render(
      <Table hoverable>
        <tbody>
          <tr><td>1</td></tr>
        </tbody>
      </Table>,
    );
    const table = screen.getByRole('table');
    expect(table.className).toContain('tbody_tr:hover');
  });
});
