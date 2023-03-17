interface IProps {
    success: Boolean,
    message: string,
    red?: string,
    green?: string,
}

const Toast = ({
    success = true, 
    message= 'test message',
    red = '#E92127',
    green = '#4D9456',
}: IProps) => {


  const toastIcon = {
    backgroundColor: success ? green : red,
  }

  return (
    <div className='toast'>
      <span style={toastIcon}>{success ? '✓' : '!'}</span>
      <span>{message}</span>
    </div>
  )
}

export default Toast