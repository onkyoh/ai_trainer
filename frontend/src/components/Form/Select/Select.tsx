interface IProps {
    value: string,
    name: string,
    list: string[],
    defaultValue?: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}


const Select = ({
  list, 
  value, 
  onChange, 
  name, 
  defaultValue = '',
}: IProps) => {

  const style: React.CSSProperties = {
    textTransform: 'capitalize'
  }

  return (
    <select onChange={(e) => onChange(e)} value={value} name={name}>
        <option disabled={true} value="">
          {defaultValue}
        </option>
        {list.map((item) => (
            <option value={item} key={item} style={style}>{item}</option>
        ))}
    </select>
  )
}

export default Select