import { Dispatch, SetStateAction } from 'react'
import Button from '../../../components/Elements/Button/Button'
import TextRow from './TextRow'
import InputRow from './InputRow'
import Spinner from '../../../components/Elements/Spinner/Spinner'
import ButtonGroup from './ButtonGroup'

import { FiPlusCircle } from 'react-icons/fi'

import { IPoint } from '../../../types'

import { editPoint } from '../api/editPoint'
import { addPoint } from '../api/addPoint'
import { deletePoint } from '../api/deletePoint'

import useTable from '../hooks/useTable'

interface IProps {
    points: IPoint[] | [], 
    planId: string,
    setPoints: Dispatch<SetStateAction<[] | IPoint[]>>,
    yAxis: string,
}

const Table = ({points, planId, setPoints, yAxis}: IProps) => {

    const {
        isLoading,
        newPoint,
        editingId,
        handleNewPoint,
        toggleEditMode,
        sendHandler,
        handleChangeInput,
    } = useTable({setPoints, points, planId})

  return (
    <div id='table'>
        {isLoading && <Spinner/>}
        <table>
            <thead>
                <tr>
                    <td>{yAxis}</td>
                    <td>Date</td>
                </tr>
            </thead>
            <tbody>
                <InputRow {...newPoint} onChange={(e) => handleNewPoint(e)} _id="newPoint">
                    <div>
                        <Button onClick={() => sendHandler(addPoint, newPoint)}>
                            <FiPlusCircle/>
                        </Button>
                    </div>
                </InputRow>
                {points?.length > 0 && points.map(point => (
                    editingId !== point._id ?
                        <TextRow {...point} key={point._id}>
                            <ButtonGroup 
                            edit={() => toggleEditMode(point._id)} 
                            remove={() => sendHandler(deletePoint, point._id)}
                            />
                        </TextRow>
                        :
                        <InputRow {...point} key={point._id} onChange={(e) => handleChangeInput(e, point._id)} onBlur={() => sendHandler(editPoint, point)}>
                           <ButtonGroup 
                            edit={() => toggleEditMode(point._id)} 
                            remove={() => sendHandler(deletePoint, point._id)}
                            />
                        </InputRow>
                    ))}
            </tbody>
        </table>
    </div>
  )
}

export default Table