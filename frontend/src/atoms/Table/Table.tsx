import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
} from 'lucide-react';

const tableVariants = cva(
  'w-full caption-bottom text-sm text-left border-collapse text-foreground [&_th]:border-b [&_th]:text-left [&_th]:font-semibold [&_th]:px-3 [&_td]:px-3 [&_td]:py-2 [&_th]:py-2 [&_td]:border-b [&_tr:last-child_>_td]:border-0',
  {
    variants: {
      variant: {
        simple: '',
        striped: '[&_tbody_tr:nth-child(even)]:bg-muted',
      },
      size: {
        sm: '[&_th]:py-1 [&_td]:py-1',
        md: '[&_th]:py-2 [&_td]:py-2',
        lg: '[&_th]:py-3 [&_td]:py-3',
      },
      color: {
        muted: '[&_th]:bg-muted',
        primary: '[&_th]:bg-primary [&_th]:text-primary-foreground',
        secondary: '[&_th]:bg-secondary [&_th]:text-secondary-foreground',
        tertiary: '[&_th]:bg-tertiary [&_th]:text-tertiary-foreground',
        quaternary: '[&_th]:bg-quaternary [&_th]:text-quaternary-foreground',
        success: '[&_th]:bg-success [&_th]:text-success-foreground',
      },
      hoverable: {
        true: '[&_tbody_tr:hover]:bg-muted',
      },
    },
    defaultVariants: {
      variant: 'simple',
      size: 'md',
      color: 'muted',
    },
  },
);

export interface Column {
  /** Key in the data object */
  key: string;
  /** Header label */
  header: React.ReactNode;
  /** Whether the column can be sorted */
  sortable?: boolean;
  /** Custom cell renderer */
  render?: (row: Record<string, any>) => React.ReactNode;
}

export interface TableProps
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  /** Caption for the table, placed below */
  caption?: string;
  /** Column definitions for data driven tables */
  columns?: Column[];
  /** Data records for data driven tables */
  data?: Record<string, any>[];
  /** Highlight rows on hover */
  hoverable?: boolean;
  /** Wrap table in a responsive container */
  responsive?: boolean;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      className,
      variant,
      size,
      color,
      caption,
      columns,
      data,
      hoverable,
      responsive,
      children,
      ...props
    },
    ref,
  ) => {
    const [sortConfig, setSortConfig] = React.useState<{
      key: string;
      direction: 'asc' | 'desc';
    }>();

    const handleSort = (key: string) => {
      setSortConfig((prev) => {
        if (!prev || prev.key !== key) return { key, direction: 'asc' };
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      });
    };

    const sortedData = React.useMemo(() => {
      if (!data) return undefined;
      if (!sortConfig) return data;
      return [...data].sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal === undefined || bVal === undefined) return 0;
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }, [data, sortConfig]);

    const table = (
      <table
        ref={ref}
        className={cn(
          tableVariants({ variant, size, color, hoverable }),
          className,
        )}
        {...props}
      >
        {columns && sortedData ? (
          <>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                    className={cn(col.sortable && 'cursor-pointer select-none')}
                  >
                    <span className="flex items-center">
                      {col.header}
                      {col.sortable && (
                        sortConfig?.key === col.key ? (
                          sortConfig.direction === 'asc' ? (
                            <ChevronUp className="ml-1 h-3 w-3" />
                          ) : (
                            <ChevronDown className="ml-1 h-3 w-3" />
                          )
                        ) : (
                          <ChevronsUpDown className="ml-1 h-3 w-3 opacity-50" />
                        )
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row) : (row as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          children
        )}
        {caption && (
          <caption className="mt-2 text-sm text-muted-foreground">
            {caption}
          </caption>
        )}
      </table>
    );

    return responsive ? (
      <div className="w-full overflow-x-auto">{table}</div>
    ) : (
      table
    );
  },
);
Table.displayName = 'Table';

export { tableVariants };
