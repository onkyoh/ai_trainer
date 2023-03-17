interface IFieldWrapper {
    label: string,
    children: React.ReactNode,
}

const FieldWrapper = ({
    label, 
    children,
}: IFieldWrapper) => {

  return (
    <div>
        <label className="field-wrapper">
            {label}
            <div>{children}</div>
        </label>
  </div>
  )
}

export default FieldWrapper