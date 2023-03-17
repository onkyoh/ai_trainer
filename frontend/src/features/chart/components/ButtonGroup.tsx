import Button from '../../../components/Elements/Button/Button'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

interface IProps {
    edit: () => void,
    remove: () => void
}

const ButtonGroup = ({edit, remove}: IProps) => {
  return (
    <div>
       <Button onClick={edit}>
            <AiFillEdit/>
        </Button>
        <Button onClick={remove}>
            <AiFillDelete/>
        </Button>
    </div>
  )
}

export default ButtonGroup