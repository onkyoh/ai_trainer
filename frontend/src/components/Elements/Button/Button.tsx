import React from 'react'

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode,
    isDisabled?: boolean,
    className?: string,
    label?: string
}

const Button = ({
    type = 'button',
    className = '',
    isDisabled = false,
    children,
    onClick,
    label
}: IButtonProps) => {
  return (
    <button type={type} disabled={isDisabled} className={className} onClick={onClick} aria-label={label}>
        {children}
    </button>
  )
}

export default Button