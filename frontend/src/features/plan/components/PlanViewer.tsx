import { IWorkout } from "../../../types"

interface IProps {
  plan: IWorkout[]
}

const PlanViewer = ({plan}: IProps) => {
  return (
    <div id="workout-list" aria-label="workout-list">
      {
        plan.map((element) => (
          <div key={element.label}>
            <label key={element.label}>{element.label}</label>
            <ul key={element.label + 'list'}>
              {element.exercises.map((workout) => (
                <li key={workout.name}>
                  <span>{workout.name}: </span>
                  <span>{workout.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  )
}

export default PlanViewer