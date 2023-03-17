import { IPlan } from '../../../types'
import PlanForm from './PlanForm'
import PlanViewer from './PlanViewer'

interface IProps {
    selectPlan: (plan: IPlan | null) => void,
    currentPlan: IPlan | null,
    creatingNew: boolean,
}

const Plan = ({selectPlan, creatingNew, currentPlan}: IProps) => {
  return (
    <div id="view-plan">
        {creatingNew ? 
        <PlanForm selectPlan={selectPlan}/>
        :
        <>
            {currentPlan && <PlanViewer plan={currentPlan?.plan}/>}
        </>
        }
    </div>
  )
}

export default Plan