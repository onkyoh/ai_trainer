import { ITablePoint } from '../types'

interface IInputPoint extends ITablePoint{
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    onBlur?: React.FocusEventHandler<HTMLInputElement>
}
  
const InputRow = ({
    className = '',
    value,
    date,
    children,
    _id = 'newInput',
    onChange,
    onBlur
}: IInputPoint) => {

  return (
    <tr className={className} key={_id}>
        <td><input type="text" name="value" onChange={onChange} value={value} onBlur={onBlur}/></td>
        <td><input type="date" name="date" onChange={onChange} value={date} onBlur={onBlur}/></td>
        <td>{children}</td>
    </tr>
  )
}

export default InputRow