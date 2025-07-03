import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "peer block w-full rounded-md border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "py-1 px-2 text-sm",
        md: "py-2 px-3 text-base",
        lg: "py-3 px-4 text-lg",
      },
      leftIcon: {
        true: "pl-10",
      },
      rightIcon: {
        true: "pr-10",
      },
      rightButton: {
        true: "pr-14",
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
    defaultVariants: {
      size: "md",
      color: "primary",
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    Omit<
      VariantProps<typeof inputVariants>,
      "error" | "leftIcon" | "rightIcon"
    > {
  LeftIcon?: React.ElementType;
  RightIcon?: React.ElementType;
  RightButton?: React.ElementType;
  onRightButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  error?: boolean;
  label?: string;
  showCharCount?: boolean;
  color?: VariantProps<typeof inputVariants>["color"];
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      LeftIcon,
      RightIcon,
      RightButton,
      onRightButtonClick,
      error,
      label,
      showCharCount,
      color,
      onChange,
      id,
      ...props
    },
    ref,
  ) => {
    const iconSize = size === "lg" ? 20 : size === "md" ? 18 : 16;
    const hasLeft = Boolean(LeftIcon);
    const hasRight = Boolean(RightIcon);
    const hasRightButton = Boolean(RightButton);
    const [count, setCount] = React.useState(
      (props.value ?? props.defaultValue ?? "").toString().length,
    );

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      onChange?.(e);
      if (showCharCount && props.value === undefined) {
        setCount(e.target.value.length);
      }
    };

    const inputId =
      id || label
        ? `${id ?? label?.replace(/\s+/g, "-").toLowerCase()}`
        : undefined;
    const iconFocusMap: Record<string, string> = {
      primary: "group-focus-within:text-primary",
      secondary: "group-focus-within:text-secondary",
      tertiary: "group-focus-within:text-tertiary",
      quaternary: "group-focus-within:text-quaternary",
      success: "group-focus-within:text-success",
      destructive: "group-focus-within:text-destructive",
    };
    const iconFocusColor = color ? iconFocusMap[color] : "";

    return (
      <div className="relative group">
        {LeftIcon && (
          <LeftIcon
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 text-muted",
              iconFocusColor,
            )}
            size={iconSize}
          />
        )}
        <input
          id={inputId}
          type="text"
          ref={ref}
          aria-invalid={error ? "true" : undefined}
          placeholder={label ? " " : props.placeholder}
          className={cn(
            inputVariants({
              size,
              error,
              leftIcon: hasLeft,
              rightIcon: hasRight || hasRightButton,
              rightButton: hasRightButton,
              color,
              className,
            }),
          )}
          onChange={handleChange}
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "pointer-events-none absolute left-3 top-2 text-xs text-muted-foreground transition-all",
              "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2",
              "peer-focus:top-0 peer-focus:-translate-y-[1.2rem]",
            )}
          >
            {label}
          </label>
        )}
        {RightIcon && (
          <RightIcon
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 text-muted",
              iconFocusColor,
            )}
            size={iconSize}
          />
        )}
        {RightButton && (
          <button
            type="button"
            onClick={onRightButtonClick}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 text-muted",
              iconFocusColor,
            )}
          >
            <RightButton size={iconSize} />
          </button>
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
Input.displayName = "Input";

export { inputVariants };
