import { IWorkout } from "../../../types"

interface IProps {
  plan: IWorkout[]
}

const PlanViewer = ({plan}: IProps) => {
  return (
    <div id="workout-list">
      {
        plan.map((element) => (
          <>
            <label>{element.label}</label>
            <ul>
              {element.exercises.map((workout) => (
                <li>
                  <span>{workout.name}: </span>
                  <span>{workout.amount}</span>
                </li>
              ))}
            </ul>
          </>
        ))}
    </div>
  )
}

export default PlanViewer