import React from 'react'

interface IFormProps extends React.HTMLProps<HTMLFormElement> {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const Form = ({
    onSubmit,
    children,
    ...rest
}: IFormProps) => {

  return (
    <form onSubmit={onSubmit} {...rest} role='form'>
        {children}
    </form>
  )
}

export default Form