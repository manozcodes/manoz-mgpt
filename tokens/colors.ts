export const colors = {
  // Base colors
  background: {
    DEFAULT: '#111213',
    dark: '#0a0c0d',
    card: '#16191c',
    hover: '#212529',
    input: '#1d2125',
  },
  
  // Foreground colors
  foreground: {
    DEFAULT: '#e4e6e8',
    muted: '#898c92',
    subtle: '#8b8f95',
    disabled: '#5d6165',
  },
  
  // Border colors
  border: {
    DEFAULT: '#303438',
    hover: '#4a4e53',
    subtle: '#3a3e43',
    strong: '#505458',
  },
  
  // Primary colors (brand)
  primary: {
    DEFAULT: '#ff7b16', // Orange
    hover: '#ff8504',
    light: 'rgba(255, 123, 22, 0.1)',
    dark: '#ff2c9b',
  },
  
  // Accent colors
  accent: {
    pink: '#e83edf',
    violet: 'rgba(138, 43, 226, 0.5)',
    purple: '#8a2be2',
  },
  
  // Semantic colors
  success: {
    DEFAULT: '#4ada6f',
    light: 'rgba(74, 218, 111, 0.1)',
  },
  
  warning: {
    DEFAULT: '#d89c3a',
    light: '#27231e',
  },
  
  error: {
    DEFAULT: '#ee0b37',
    light: '#27181e',
  },
  
  info: {
    DEFAULT: '#505458',
  },
  
  // Neutral grays
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
} as const

export type ColorKey = keyof typeof colors
export type ColorValue = typeof colors[ColorKey]


