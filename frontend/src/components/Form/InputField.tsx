import FieldWrapper from './FieldWrapper'

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    type?: 'text' | 'email' | 'password',
    className?: string,
    label: string,
    name: string
}

const InputField = ({
    type='text', 
    label,
    className,
    value,
    name,
    onChange
}: IInputProps) => {

  return (
    <FieldWrapper label={label}>
        <input type={type} name={name} className={className} value={value} onChange={onChange}/>
    </FieldWrapper>
  )
}

export default InputField