import React, { ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  asChild?: boolean;
  'data-testid'?: string; // Garantindo a tipagem do testid de forma explícita
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  asChild = false,
  className = '',
  'data-testid': testId,
  ...props
}) => {
  const Component = asChild ? Slot : 'button';

  return (
    <Component
      data-testid={testId || 'button-component'}
      className={`
        px-6 py-3 rounded-full font-medium transition-all duration-200 
        active:scale-95 disabled:opacity-50 disabled:pointer-events-none
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
        ${variant === 'primary' ? 'bg-primary text-text-button' : 'bg-transparent border border-primary text-primary'}
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};
