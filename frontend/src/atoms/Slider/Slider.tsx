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
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const [internal, setInternal] = React.useState(
      Number(value ?? defaultValue ?? min),
    );
    const [showTip, setShowTip] = React.useState(false);

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

    const handleTrackClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
      if (!inputRef.current) return;
      const rect = inputRef.current.getBoundingClientRect();
      const clickPercentage = (e.clientX - rect.left) / rect.width;
      const newValue =
        Number(min) + clickPercentage * (Number(max) - Number(min));
      const stepped = Math.round(newValue / Number(step)) * Number(step);
      if (value === undefined) {
        setInternal(stepped);
      }
      inputRef.current.value = stepped.toString();
      const event = new Event('input', { bubbles: true });
      inputRef.current.dispatchEvent(event);
      const changeEvent = new Event('change', { bubbles: true });
      inputRef.current.dispatchEvent(changeEvent);
    };

    return (
      <div
        className="relative w-full"
        onPointerDown={() => setShowTip(true)}
        onPointerUp={() => setShowTip(false)}
        onPointerLeave={() => setShowTip(false)}
        onClick={handleTrackClick}
        style={{
          // @ts-ignore -- CSS variable for background size
          "--slider-percentage": `${percentage}%`,
        }}
      >
        <input
          type="range"
          role="slider"
          ref={inputRef}
          min={min}
          max={max}
          step={step}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          className={cn(sliderVariants({ size, color, className }))}
          {...props}
        />
        {showTip && (
          <span
            data-testid="slider-indicator"
            className="pointer-events-none absolute -top-6 -translate-x-1/2 rounded bg-gray-700 px-1 py-0.5 text-xs text-white"
            style={{ left: `${percentage}%` }}
          >
            {internal}
          </span>
        )}
      </div>
    );
  },
);
Slider.displayName = "Slider";

export { sliderVariants };
