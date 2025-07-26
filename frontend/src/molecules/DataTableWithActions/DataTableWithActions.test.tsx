import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DataTableWithActions, Column } from './DataTableWithActions';

interface Row { id: number; name: string; }

const columns: Column<Row>[] = [
  { id: 'name', header: 'Name', accessor: r => r.name, sortable: true },
];

const data: Row[] = [
  { id: 1, name: 'B' },
  { id: 2, name: 'A' },
];

describe('DataTableWithActions', () => {
  it('sorts rows when header clicked', () => {
    render(<DataTableWithActions data={data} columns={columns} pageSize={10} />);
    fireEvent.click(screen.getByText('Name'));
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('A');
    fireEvent.click(screen.getByText('Name'));
    expect(screen.getAllByRole('row')[1]).toHaveTextContent('B');
  });

  it('selects all rows', () => {
    render(<DataTableWithActions data={data} columns={columns} pageSize={10} />);
    fireEvent.click(screen.getByLabelText('Seleccionar todo'));
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.slice(1).every(c => (c as HTMLInputElement).checked)).toBe(true);
  });

  it('hides row on next page', () => {
    const rows = Array.from({ length: 11 }, (_, i) => ({ id: i + 1, name: `Row ${i + 1}` }));
    render(<DataTableWithActions data={rows} columns={columns} pageSize={10} />);
    expect(screen.queryByText('Row 11')).not.toBeInTheDocument();
  });
});
