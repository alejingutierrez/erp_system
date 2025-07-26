import * as React from 'react';
import { cn } from '@/lib/utils';
import { tableVariants } from '@/atoms/Table/Table';
import { Checkbox } from '@/atoms/Checkbox/Checkbox';
import { Button } from '@/atoms/Button';
import { Icon } from '@/atoms/Icon';
import { PaginationControls } from '@/molecules/PaginationControls';

export interface Column<T> {
  id: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: number;
}

export interface DataTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[];
  columns: Column<T>[];
  onEdit?(row: T): void;
  onDelete?(row: T): void;
  pageSize?: number;
}

export function DataTableWithActions<T extends Record<string, any>>({
  data,
  columns,
  onEdit,
  onDelete,
  pageSize = 10,
  className,
  ...props
}: DataTableProps<T>) {
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState<Set<number>>(new Set());
  const [sort, setSort] = React.useState<{ id: string; direction: 'asc' | 'desc' }>();

  const handleSort = (id: string) => {
    setSort((prev) => {
      if (!prev || prev.id !== id) return { id, direction: 'asc' };
      return { id, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sort) return data;
    const col = columns.find((c) => c.id === sort.id);
    if (!col) return data;
    return [...data].sort((a, b) => {
      const aVal = col.accessor(a) as any;
      const bVal = col.accessor(b) as any;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sort.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      const aStr = String(aVal);
      const bStr = String(bVal);
      return sort.direction === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
  }, [data, sort, columns]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const start = (page - 1) * pageSize;
  const pageData = sortedData.slice(start, start + pageSize);

  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const toggleRow = (index: number) => {
    setSelected((prev) => {
      const set = new Set(prev);
      if (set.has(index)) set.delete(index);
      else set.add(index);
      return set;
    });
  };

  const pageIndexes = pageData.map((_, i) => start + i);
  const allSelected = pageIndexes.every((i) => selected.has(i));
  const someSelected = pageIndexes.some((i) => selected.has(i));

  const toggleAll = () => {
    setSelected((prev) => {
      const set = new Set(prev);
      if (allSelected) pageIndexes.forEach((i) => set.delete(i));
      else pageIndexes.forEach((i) => set.add(i));
      return set;
    });
  };

  const handleBulkDelete = () => {
    if (!onDelete) return;
    selected.forEach((i) => {
      const row = sortedData[i];
      if (row) onDelete(row);
    });
    setSelected(new Set());
  };

  const handleBulkEdit = () => {
    if (!onEdit) return;
    selected.forEach((i) => {
      const row = sortedData[i];
      if (row) onEdit(row);
    });
  };

  return (
    <div className={cn('space-y-2', className)} {...props}>
      {selected.size > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm">{selected.size} seleccionados</span>
          {onEdit && (
            <Button size="sm" variant="outline" onClick={handleBulkEdit}>
              <Icon name="Edit" />
            </Button>
          )}
          {onDelete && (
            <Button size="sm" variant="outline" intent="secondary" onClick={handleBulkDelete}>
              <Icon name="Trash2" />
            </Button>
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className={cn(tableVariants({ hoverable: true }), 'min-w-full')}>
          <thead>
            <tr>
              <th className="w-10 text-center">
                <Checkbox
                  aria-label="Seleccionar todo"
                  checked={allSelected}
                  indeterminate={!allSelected && someSelected}
                  onChange={toggleAll}
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.id}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={col.sortable ? () => handleSort(col.id) : undefined}
                  className={cn(col.sortable && 'cursor-pointer select-none')}
                  aria-sort={
                    sort?.id === col.id ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'
                  }
                >
                  <span className="flex items-center">
                    {col.header}
                    {col.sortable && sort?.id === col.id && (
                      <Icon name={sort.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} className="ml-1 h-3 w-3" />
                    )}
                    {col.sortable && sort?.id !== col.id && (
                      <Icon name="ChevronsUpDown" className="ml-1 h-3 w-3 opacity-50" />
                    )}
                  </span>
                </th>
              ))}
              {(onEdit || onDelete) && <th className="w-20" />}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, rowIdx) => {
              const idx = start + rowIdx;
              return (
                <tr key={idx}>
                  <td className="text-center">
                    <Checkbox
                      aria-label="Seleccionar fila"
                      checked={selected.has(idx)}
                      onChange={() => toggleRow(idx)}
                    />
                  </td>
                  {columns.map((col) => (
                    <td key={col.id}>{col.accessor(row)}</td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="flex gap-1">
                      {onEdit && (
                        <Button
                          variant="icon"
                          size="sm"
                          onClick={() => onEdit(row)}
                          aria-label="Editar fila"
                        >
                          <Icon name="Edit" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="icon"
                          size="sm"
                          intent="secondary"
                          onClick={() => onDelete(row)}
                          aria-label="Eliminar fila"
                        >
                          <Icon name="Trash2" />
                        </Button>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={setPage} className="justify-center" />
      )}
    </div>
  );
}
