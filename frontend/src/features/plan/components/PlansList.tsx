import { IPlan } from '../../../types'
import PlanItem from './PlanItem'
import Button from '../../../components/Elements/Button/Button'
import { FiPlusCircle } from 'react-icons/fi'
import { GiCancel } from 'react-icons/gi'
import useDeletePlan from '../hooks/useDeletePlan'

interface IProps {
    plans: IPlan[] | [],
    selectPlan: (plan: IPlan | null) => void,
    currentPlan: IPlan | null,
    creatingNew: boolean,
    toggleCreateNew: () => void,
    children: React.ReactNode
}

const PlansList = ({
  plans, 
  currentPlan, 
  selectPlan, 
  creatingNew, 
  toggleCreateNew,
  children
}: IProps) => {

  const {deletingId, toggleDeleteMode, sendDelete} = useDeletePlan(selectPlan, currentPlan?._id)

  return (
    <div id="plans-list">

      {children}

      <div id="list-header">
        <Button onClick={toggleCreateNew}>
            {creatingNew ? <GiCancel size={20}/> : <FiPlusCircle size={20}/>}
        </Button>
      </div>
    
      <ul>
        {plans.map(plan => (
          <PlanItem 
          name={plan.name} 
          onClick={() => selectPlan(plan)} 
          isCurrent={currentPlan?._id === plan._id}
          id={plan._id}
          toggleDeleteMode={toggleDeleteMode}
          deletingId={deletingId}
          sendDelete={sendDelete}
          />
        ))}
      </ul>

    </div>
  )
}

export default PlansList