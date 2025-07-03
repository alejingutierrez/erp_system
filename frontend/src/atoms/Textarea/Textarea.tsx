import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "peer block w-full rounded-md bg-white text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "py-1 px-2 text-sm",
        md: "py-2 px-3 text-base",
        lg: "py-3 px-4 text-lg",
      },
      variant: {
        default: "border border-border focus:ring-2",
        ghost: "border-none focus:ring-0",
      },
      color: {
        primary: "border-primary focus:ring-primary",
        secondary: "border-secondary focus:ring-secondary",
        tertiary: "border-tertiary focus:ring-tertiary",
        quaternary: "border-quaternary focus:ring-quaternary",
        success: "border-success focus:ring-success",
        destructive: "border-destructive focus:ring-destructive",
      },
      error: {
        true: "border-destructive focus:ring-destructive",
      },
    },
    compoundVariants: [
      { variant: "ghost", color: "primary", className: "" },
      { variant: "ghost", color: "secondary", className: "" },
      { variant: "ghost", color: "tertiary", className: "" },
      { variant: "ghost", color: "quaternary", className: "" },
      { variant: "ghost", color: "success", className: "" },
      { variant: "ghost", color: "destructive", className: "" },
    ],
    defaultVariants: {
      size: "md",
      variant: "default",
      color: "primary",
    },
  },
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    Omit<VariantProps<typeof textareaVariants>, "error"> {
  label?: string;
  showCharCount?: boolean;
  error?: boolean;
  autoResize?: boolean;
}

const sizeRows: Record<NonNullable<VariantProps<typeof textareaVariants>["size"]>, number> = {
  sm: 3,
  md: 5,
  lg: 8,
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      size,
      variant,
      color,
      label,
      showCharCount,
      error,
      autoResize,
      onChange,
      rows,
      id,
      ...props
    },
    ref,
  ) => {
    const [count, setCount] = React.useState(
      (props.value ?? props.defaultValue ?? "").toString().length,
    );

    const internalRef = React.useRef<HTMLTextAreaElement>(null);

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.RefObject<HTMLTextAreaElement>).current = node;
        }
      },
      [ref],
    );

    const resize = React.useCallback((el: HTMLTextAreaElement | null) => {
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }, []);

    React.useEffect(() => {
      if (autoResize) {
        resize(internalRef.current);
      }
    }, [autoResize, resize, props.value]);

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      onChange?.(e);
      if (showCharCount && props.value === undefined) {
        setCount(e.target.value.length);
      }
      if (autoResize) {
        resize(e.target);
      }
    };

    const textareaId =
      id || label ? `${id ?? label?.replace(/\s+/g, "-").toLowerCase()}` : undefined;

    const appliedRows = rows ?? (autoResize ? 1 : sizeRows[size ?? "md"]);

    return (
      <div className="relative">
        <textarea
          id={textareaId}
          ref={setRefs}
          rows={appliedRows}
          aria-invalid={error ? "true" : undefined}
          placeholder={label ? " " : props.placeholder}
          className={cn(
            textareaVariants({ size, variant, color, error, className }),
            autoResize ? "resize-none overflow-hidden transition-all" : "resize-y",
          )}
          onChange={handleChange}
          {...props}
        />
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "pointer-events-none absolute left-3 top-2 text-xs text-muted-foreground transition-all",
              "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2",
              "peer-focus:top-0 peer-focus:-translate-y-[1.2rem]",
            )}
          >
            {label}
          </label>
        )}
        {showCharCount && (
          <span className="absolute bottom-1 right-3 text-xs text-muted-foreground">
            {count}
            {props.maxLength ? `/${props.maxLength}` : ""}
          </span>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { textareaVariants };
