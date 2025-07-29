import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AppLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar?: React.ReactNode;
  topbar?: React.ReactNode;
}

export const AppLayout = React.forwardRef<HTMLDivElement, AppLayoutProps>(
  ({ className, sidebar, topbar, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex h-screen bg-background', className)} {...props}>
        {sidebar}
        <div className="flex-1 flex flex-col overflow-hidden">
          {topbar}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
            {children}
          </main>
        </div>
      </div>
    );
  },
);

AppLayout.displayName = 'AppLayout';
