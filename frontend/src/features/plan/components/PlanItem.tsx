import React from 'react'
import { COLORS } from '../../../utils/constants'
import { AiFillDelete} from 'react-icons/ai'
import Button from '../../../components/Elements/Button/Button'
import { FaCheck } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'

interface IProps {
    onClick: React.MouseEventHandler<HTMLParagraphElement>,
    isCurrent: boolean,
    name: string,
    id: string,
    toggleDeleteMode: (id: string) => void,
    deletingId: string | undefined,
    sendDelete: (id: string) => void
}

const PlanItem = ({
    onClick,
    isCurrent = false,
    name,
    id,
    deletingId,
    toggleDeleteMode,
    sendDelete
}: IProps) => {

    const itemStyle = {
        backgroundColor: isCurrent ? COLORS.DARKGRAY : COLORS.GRAY,
    }

  return (
    <li style={itemStyle} key={id}>
        <p onClick={onClick}>{name}</p>
        {deletingId === id ?
            <div>
                <Button onClick={() => sendDelete(id)}>
                    <FaCheck/>
                </Button>
                <Button onClick={() => toggleDeleteMode('')}>
                    <GiCancel size={20}/>
                </Button>
            </div>
            :
            isCurrent && 
            <Button onClick={() => toggleDeleteMode(id)}>
                <AiFillDelete/>
            </Button>
        }
    </li>
  )
}

export default PlanItem