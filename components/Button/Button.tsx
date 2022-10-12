import React from 'react'
import cn from 'clsx'
import s from './Button.module.css'

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'action'
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  className,
  ...props
}: ButtonProps) => {
  const rootClassName = cn(s.root, {
    [s.secondary]: variant === 'secondary',
    [s.action]: variant === 'action',
  })
  return (
    <button className={rootClassName} {...props}>
      {children}
    </button>
  )
}

export default Button
