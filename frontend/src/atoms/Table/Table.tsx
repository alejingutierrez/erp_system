import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

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
    },
    defaultVariants: {
      variant: 'simple',
      size: 'md',
      color: 'muted',
    },
  },
);

export interface TableProps
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  /** Caption for the table, placed below */
  caption?: string;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, size, color, caption, children, ...props }, ref) => (
    <table ref={ref} className={cn(tableVariants({ variant, size, color }), className)} {...props}>
      {children}
      {caption && <caption className="mt-2 text-sm text-muted-foreground">{caption}</caption>}
    </table>
  ),
);
Table.displayName = 'Table';

export { tableVariants };
