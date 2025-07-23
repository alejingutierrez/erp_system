import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const headerVariants = cva(
  "flex w-full items-center justify-between py-2 text-left font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary",
  {
    variants: {
      color: {
        primary: "text-primary",
        secondary: "text-secondary",
        tertiary: "text-tertiary",
        quaternary: "text-quaternary",
        success: "text-success",
      },
    },
    defaultVariants: {
      color: "primary",
    },
  },
);

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof headerVariants> {
  /** Header text or node */
  title: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Initial open state when uncontrolled */
  defaultOpen?: boolean;
  /** Callback when toggled */
  onToggle?: (open: boolean) => void;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      title,
      children,
      color,
      open,
      defaultOpen = false,
      onToggle,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    const handleToggle = () => {
      if (!isControlled) setInternalOpen(!isOpen);
      onToggle?.(!isOpen);
    };

    const contentId = React.useId();
    const headerId = React.useId();

    return (
      <div
        ref={ref}
        className={cn("border-b border-border bg-white", className)}
        {...props}
      >
        <button
          type="button"
          id={headerId}
          aria-controls={contentId}
          aria-expanded={isOpen}
          onClick={handleToggle}
          className={cn(headerVariants({ color }))}
        >
          <span>{title}</span>
          <ChevronDown
            size={16}
            className={cn("transition-transform", isOpen && "rotate-180")}
          />
        </button>
        <div
          id={contentId}
          role="region"
          aria-labelledby={headerId}
          className={cn("pt-1 pb-2 text-sm", !isOpen && "hidden")}
        >
          {children}
        </div>
      </div>
    );
  },
);
Accordion.displayName = "Accordion";

export { headerVariants as accordionHeaderVariants };
