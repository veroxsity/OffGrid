import { forwardRef, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'success' | 'premium';
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', loading = false, icon, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-[6px] font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:opacity-50 disabled:pointer-events-none active:scale-95 relative overflow-hidden';
    
    const variants = {
      default: 'bg-[var(--ds-interactive-normal)] text-[var(--ds-text-inverted)] hover:bg-[var(--ds-interactive-hover)] active:bg-[var(--ds-interactive-active)] border border-transparent focus-visible:ring-[var(--ds-background-accent)]',
      outline: 'bg-[var(--ds-background-secondary)] text-[var(--ds-text-normal)] border border-[var(--ds-border-subtle)] hover:bg-[var(--ds-background-tertiary)] focus-visible:ring-[var(--ds-background-accent)]',
      secondary: 'bg-[var(--ds-background-secondary)] text-[var(--ds-text-normal)] border border-[var(--ds-border-subtle)] hover:bg-[var(--ds-background-tertiary)]',
      ghost: 'bg-transparent text-[var(--ds-text-muted)] hover:bg-[var(--ds-background-secondary)]',
      destructive: 'bg-[var(--ds-danger)] text-white hover:bg-[#ff5558] active:bg-[#d83639] focus-visible:ring-[#ff5558] border border-transparent',
      success: 'bg-[var(--ds-success)] text-white hover:brightness-110 active:brightness-95 border border-transparent',
      premium: 'bg-[var(--ds-interactive-normal)] text-[var(--ds-text-inverted)] hover:bg-[var(--ds-interactive-hover)] border border-transparent',
    } as const;
    
    const sizes = {
      xs: 'h-7 px-2.5 text-xs',
      sm: 'h-8 px-3 text-sm',
      default: 'h-10 px-4 text-sm',
      lg: 'h-11 px-5 text-base',
      xl: 'h-12 px-6 text-lg',
    } as const;

    const iconSizes = {
      xs: 'w-3 h-3',
      sm: 'w-3.5 h-3.5',
      default: 'w-4 h-4',
      lg: 'w-5 h-5',
      xl: 'w-6 h-6',
    } as const;

    const classes = [
      baseStyles,
      variants[variant],
      sizes[size],
      className
    ].filter(Boolean).join(' ');

    return (
      <button
        className={classes}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && (
          <svg className={`animate-spin -ml-1 mr-2 ${iconSizes[size]}`} role="status" aria-label="Loading" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {!loading && icon && (
          <span className={`${children ? 'mr-2' : ''} ${iconSizes[size]} flex-shrink-0`}> {icon} </span>
        )}
        <span className="relative z-10 whitespace-nowrap">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
