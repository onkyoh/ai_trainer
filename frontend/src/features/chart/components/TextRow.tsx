import { ITablePoint } from '../types'

const TextRow = ({
    className = '',
    value,
    date,
    children,
}: ITablePoint) => {

  return (
    <tr className={className}>
        <td><p>{value}</p></td>
        <td><p>{date}</p></td>
        <td>{children}</td>
    </tr>
  )
}

export default TextRow