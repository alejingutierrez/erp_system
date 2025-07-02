// frontend/src/styles/theme.ts

/**
 * Core color palette
 * These are the raw color values that other tokens will reference.
 */
const palette = {
  black: "#000000",
  white: "#FFFFFF",

  neutral: {
    50: "#F8F9FA",
    100: "#F1F3F5",
    200: "#E9ECEF",
    300: "#DEE2E6",
    400: "#CED4DA",
    500: "#ADB5BD",
    600: "#868E96",
    700: "#495057",
    800: "#343A40",
    900: "#212529",
  },

  // Brand Colors from agents.md
  brand: {
    primary: "#000000",
    secondary: "#60CBC5",
    tertiary: "#FF837A",
    quaternary: "#FBE267",
    success: "#9EDC75",
    altPrimary: "#233640",
  },
} as const;

/**
 * Design Tokens
 * This is the centralized theme configuration that will be consumed by Tailwind
 * and other parts of the application.
 */
export const tokens = {
  colors: {
    ...palette.brand,
    neutral: palette.neutral,

    // Semantic UI colors for light and dark modes
    background: "hsl(0 0% 100%)", // white
    foreground: palette.neutral[900],
    primary: palette.brand.primary,
    'primary-foreground': palette.white,

    secondary: palette.brand.secondary,
    'secondary-foreground': palette.neutral[900],

    // Destructive/Error states
    destructive: palette.brand.tertiary,
    'destructive-foreground': palette.white,

    // Muted styles
    muted: palette.neutral[100],
    'muted-foreground': palette.neutral[600],

    // Borders and Rings
    border: palette.neutral[200],
    ring: palette.brand.secondary,

    // Glass effect
    surfaceGlass: "rgba(241, 243, 245, 0.3)", // neutral-100 with alpha

    // Dark Mode Semantic UI colors
    dark: {
      background: "hsl(210 10% 3.9%)", // almost black
      foreground: palette.neutral[50],
      primary: palette.brand.primary,
      'primary-foreground': palette.white,

      secondary: palette.brand.secondary,
      'secondary-foreground': palette.neutral[50],

      destructive: palette.brand.tertiary,
      'destructive-foreground': palette.neutral[50],

      muted: palette.neutral[800],
      'muted-foreground': palette.neutral[400],

      border: palette.neutral[800],
      ring: palette.brand.secondary,

      surfaceGlass: "rgba(33, 37, 41, 0.3)", // neutral-900 with alpha
    },
  },
  radius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
  },
  shadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    glass: "0 8px 32px rgba(31, 38, 135, 0.37)",
  },
  fontFamily: {
    sans: ['"Cairo Play"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    heading: ['Anta', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  },
} as const;

