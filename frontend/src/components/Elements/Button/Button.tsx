import React from 'react'

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode,
    isDisabled?: boolean,
    className?: string,
}

const Button = ({
    type = 'button',
    className = '',
    isDisabled = false,
    children,
    onClick
}: IButtonProps) => {
  return (
    <button type={type} disabled={isDisabled} className={className} onClick={onClick}>
        {children}
    </button>
  )
}

export default Button