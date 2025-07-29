import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from '@/atoms/Button';
import { Heading } from '@/atoms/Heading';

const level2PanelVariants = cva('p-4 bg-background text-foreground', {
  variants: {},
  defaultVariants: {},
});

export interface Level2PanelProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof level2PanelVariants> {
  title: string;
  actions?: {
    label: string;
    onClick: () => void;
  }[];
}

export const Level2Panel = React.forwardRef<HTMLElement, Level2PanelProps>(
  ({ className, title, actions, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(level2PanelVariants(), className)} {...props}>
        <div className="flex justify-between items-center mb-4">
          <Heading level={2}>{title}</Heading>
          <div className="flex gap-2">
            {actions?.map((action) => (
              <Button key={action.label} onClick={action.onClick}>
                {action.label}
              </Button>
            ))}
          </div>
        </div>
        <div>{children}</div>
      </div>
    );
  },
);

Level2Panel.displayName = 'Level2Panel';
export { level2PanelVariants };
