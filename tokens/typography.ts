export const fontSizes = {
  xs: {
    size: '0.75rem',    
    lineHeight: '1rem', 
    letterSpacing: '0',
  },
  sm: {
    size: '0.875rem',   
    lineHeight: '1.25rem', 
    letterSpacing: '0',
  },
  base: {
    size: '1rem',       
    lineHeight: '1.5rem', 
    letterSpacing: '0',
  },
  lg: {
    size: '1.125rem',   
    lineHeight: '1.75rem', 
    letterSpacing: '0.01em',
  },
  xl: {
    size: '1.25rem',    
    lineHeight: '1.75rem', 
    letterSpacing: '0',
  },
  '2xl': {
    size: '1.5rem',    
    lineHeight: '2rem', 
    letterSpacing: '0',
  },
  '3xl': {
    size: '1.875rem',  
    lineHeight: '2.25rem', 
    letterSpacing: '0',
  },
  '4xl': {
    size: '2.25rem',   
    lineHeight: '2.5rem', 
    letterSpacing: '0',
  },
} as const

export const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const

export const fontFamilies = {
  sans: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
} as const

export type FontSizeKey = keyof typeof fontSizes
export type FontWeightKey = keyof typeof fontWeights
export type FontFamilyKey = keyof typeof fontFamilies

