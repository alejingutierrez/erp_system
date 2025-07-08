import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sliderVariants = cva("slider", {
  variants: {
    size: {
      sm: "slider-sm",
      md: "slider-md",
      lg: "slider-lg",
    },
    color: {
      primary: "slider-primary",
      secondary: "slider-secondary",
      tertiary: "slider-tertiary",
      quaternary: "slider-quaternary",
      success: "slider-success",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof sliderVariants> {}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      size,
      color,
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [internal, setInternal] = React.useState(
      Number(value ?? defaultValue ?? min),
    );

    React.useEffect(() => {
      if (value !== undefined) {
        setInternal(Number(value));
      }
    }, [value]);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      if (value === undefined) {
        setInternal(Number(e.target.value));
      }
      onChange?.(e);
    };

    const percentage =
      ((internal - Number(min)) / (Number(max) - Number(min))) * 100;

    return (
      <input
        type="range"
        role="slider"
        ref={ref}
        min={min}
        max={max}
        step={step}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        className={cn(sliderVariants({ size, color, className }))}
        style={{
          // @ts-ignore -- CSS variable for background size
          "--slider-percentage": `${percentage}%`,
        }}
        {...props}
      />
    );
  },
);
Slider.displayName = "Slider";

export { sliderVariants };
