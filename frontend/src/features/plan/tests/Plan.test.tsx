import { render, waitFor, fireEvent, act, queryByText } from "@testing-library/react";
import { setupTestServer } from "../../../test/server/server";
import { initializePlan } from "../../../test/testUtils";
import Main from "../../../components/Layout/Main";
import {COLORS} from '../../../utils/constants'

//npm test -- --testPathPattern=Plan.test.tsx

setupTestServer()

describe("Plan selection, creaation and deletion", () => {

   const logout = jest.fn()

    test("should select plan from list when clicked and render its workouts in the viewer", async () => {

        initializePlan()

        const {getByRole, getByLabelText, getByText} = render(<Main logout={logout}/>)

        await waitFor(() => {
            const parItem = getByText('test-plan')
            const listItem = getByRole('listitem')
            fireEvent.click(parItem);
            expect(listItem).toHaveStyle(`background-color: ${COLORS.DARKGRAY}`);
            const workoutList = getByLabelText('workout-list')
            const descendants = workoutList.querySelectorAll('*')
            expect(descendants.length).toBeGreaterThan(0)
        })
    }),

    test("should toggle plan creation allowing for form to be filled and a plan to be generated upon submission", async () => {
        
        const {getByLabelText, getAllByRole, getByText} = render(<Main logout={logout}/>)

        const newPlanBtn = getAllByRole('button')[1]

        fireEvent.click(newPlanBtn)
        
        const goalSelect = getByLabelText('goal-input')
        fireEvent.change(goalSelect, {target: {value: 'strength'}})

        const daysSelect = getByLabelText('days-input')
        fireEvent.change(daysSelect, {target: {value: '3'}})

        const yAxisInput = getByLabelText('yAxis-input')
        fireEvent.change(yAxisInput, {target: {value: 'pounds'}})

        const equipmentSelect = getByLabelText('equipment-input')
        fireEvent.change(equipmentSelect, {target: {value: 'weights focused'}})

        const nameInput = getByLabelText('name-input')
        fireEvent.change(nameInput, {target: {value: 'test plan'}})

        await act(async () => {
            const submitButton = getByText('Generate Plan')
            fireEvent.click(submitButton)
        })

        await waitFor(() => {
            const listItem = getAllByRole('listitem')[0]
            expect(listItem).toHaveStyle(`background-color: ${COLORS.DARKGRAY}`);
            const workoutList = getByLabelText('workout-list')
            const descendants = workoutList.querySelectorAll('*')
            expect(descendants.length).toBeGreaterThan(0)
        })
    }), 
    
    test("should delete the respective plan when the delete button is clicked on a list item", async () => {

        initializePlan()

        const {queryByText, getByLabelText, getByText} = render(<Main logout={logout}/>)

        await waitFor(() => {
            const parItem = getByText('test-plan')
            fireEvent.click(parItem)
            const toggleDeleteBtn = getByLabelText('toggle-delete')
            fireEvent.click(toggleDeleteBtn)
        })
        
        await act(async () => {
            const confirmDeleteBtn = getByLabelText('confirm-delete')
            fireEvent.click(confirmDeleteBtn)
        })

        await waitFor(() => {
            expect(queryByText('test-plan')).not.toBeInTheDocument()
        })
    })
})