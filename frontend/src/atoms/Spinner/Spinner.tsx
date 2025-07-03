import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const spinnerVariants = cva('animate-spin rounded-full border-4 border-solid', {
  variants: {
    intent: {
      primary: 'border-b-transparent border-l-transparent',
      secondary: 'border-b-transparent border-l-transparent',
    },
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
});

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export function Spinner({ className, intent, size }: SpinnerProps) {
  return <div className={cn(spinnerVariants({ intent, size }), className)} />;
}
