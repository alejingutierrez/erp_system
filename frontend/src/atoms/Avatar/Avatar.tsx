import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { User } from 'lucide-react';

import { cn } from '@/lib/utils';

const avatarVariants = cva(
  'relative inline-flex items-center justify-center overflow-hidden rounded-full bg-muted select-none text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'h-6 w-6 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-16 w-16 text-lg',
      },
      color: {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        tertiary: 'bg-tertiary text-tertiary-foreground',
        quaternary: 'bg-quaternary text-quaternary-foreground',
        success: 'bg-success text-success-foreground',
        muted: 'bg-muted text-muted-foreground',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'muted',
    },
  },
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  name?: string;
}

const getInitials = (name: string) => {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, color, src, alt, name, ...props }, ref) => {
    const [error, setError] = React.useState(false);
    const showImage = src && !error;
    const initials = name ? getInitials(name) : undefined;

    return (
      <div ref={ref} className={cn(avatarVariants({ size, color }), className)} {...props}>
        {showImage ? (
          <img
            src={src}
            alt={alt ?? name ?? 'Avatar'}
            className="h-full w-full object-cover"
            onError={() => setError(true)}
          />
        ) : initials ? (
          <span aria-hidden="true" className="font-medium">
            {initials}
          </span>
        ) : (
          <User className="h-2/3 w-2/3" aria-hidden="true" />
        )}
      </div>
    );
  },
);
Avatar.displayName = 'Avatar';

export { avatarVariants };
