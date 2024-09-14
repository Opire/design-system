import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}


export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...rest }, ref) => (
    <button
      ref={ref}
      className={clsx(styles.button, className)}
      {...rest}
    />
  ),
);

Button.displayName = 'Button';