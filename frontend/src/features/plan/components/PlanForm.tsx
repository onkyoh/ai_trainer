import Spinner from '../../../components/Elements/Spinner/Spinner'
import Form from '../../../components/Form/Form/Form'
import Select from '../../../components/Form/Select/Select'
import { IPlan } from '../../../types'
import { DAYS_LIST, GOALS_LIST, EQUIPMENT_LIST } from '../../../utils/constants'
import useCreatePlan from '../hooks/useCreatePlan'

interface IProps {
  selectPlan: (plan: IPlan | null) => void
}

const PlanForm = ({
  selectPlan
}: IProps) => {

  const {handleFormValues, formValues, sendCreate, isLoading} = useCreatePlan(selectPlan)


  return (
    <>
        <Form onSubmit={sendCreate}>

          {isLoading && <Spinner/>}

          <div className='messages'>
            <p>
              Hello! I am your AI Trainer, here to assist you achieve a desired goal. 
              So... what is your goal?
            </p>

            <p className='response'>
              To maximize &nbsp;
              <Select 
              list={GOALS_LIST} 
              onChange={handleFormValues} 
              value={formValues.goal} 
              name='goal'
              />
              
            </p>
          </div>
    
          {formValues.goal && <div className='messages'>
            <p>
                Hmmm, the maximization of {formValues.goal}. A fine goal.
            </p>

            <p>
                And, how many days a week would you like to spend pursuing this goal?
            </p>
            
            <p className='response'>
              Around &nbsp;
              <Select 
              list={DAYS_LIST} 
              onChange={handleFormValues} 
              value={formValues.days} 
              name='days'
              />
              &nbsp; days a week
            </p>
          </div>}

          {formValues.days && <div className='messages'>
            <p>
              Noted, {formValues.days} days a week.
              What, if you had to choose,
              would you being measuring for this goal?
            </p>

            <p className='response'>
              I would like to measure my &nbsp;
              <input value={formValues.yAxis} name='yAxis' placeholder='measurement/unit' onChange={handleFormValues}/>
            </p>
          </div>}

          {formValues.yAxis && <div className='messages'>
            <p>Spectacular. A few more questions.</p>

            <p>What type of weight training, if any, would you like to use for this goal?</p>

            <p className='response'>
              <Select list={EQUIPMENT_LIST} onChange={handleFormValues} value={formValues.equipment} name='equipment'/>
              &nbsp; would be my preference
            </p>
          </div>}

          {formValues.equipment && <div className='messages'>
            <p>Perfect! Now may you please provide a name for this training plan?</p>

            <p className='response'>
              Yes! I would like to name it&nbsp;
              <input value={formValues.name} name='name' onChange={handleFormValues}/>
            </p>

            <button type='submit'>
              Generate Plan
            </button>
          </div>}
        </Form>
    </>
  )
}

export default PlanForm