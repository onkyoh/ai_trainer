import Table from '../components/Table';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { setupTestServer } from '../../../test/server/server';
import { initializePlan, TEST_PLAN, updatePoints } from '../../../test/testUtils';

setupTestServer();

beforeEach(() => {
    initializePlan()
})
//npm test -- --testPathPattern=Table.test.tsx

describe('Table Feature', () => {

  const points = [...TEST_PLAN.tracker.points];
  const planId = TEST_PLAN._id;
  const yAxis = TEST_PLAN.tracker.yAxis;
  const setPoints = jest.fn();

  test('should add a new point when the "Add" button is clicked', async () => {

    const { getAllByRole, queryByText,getAllByDisplayValue, rerender } = render(
      <Table points={points} planId={planId} setPoints={setPoints} yAxis={yAxis} />
    );

    const valueInput = getAllByDisplayValue('')[0]
    const dateInput = getAllByDisplayValue('')[1];

    fireEvent.change(valueInput, { target: { value: "30" } });
    fireEvent.change(dateInput, { target: { value: "2022-03-22" } });

    const addBtn = getAllByRole('button')[0];

    await act(async () => {
      fireEvent.click(addBtn);
    });

    await waitFor(() => {
        const updatedPoints: any = updatePoints(planId)

        rerender(<Table points={updatedPoints} planId={planId} setPoints={setPoints} yAxis={yAxis} />);
        
        expect(queryByText('30')).toBeInTheDocument();
        expect(queryByText('2022-03-22')).toBeInTheDocument();
    })
  });

  test("should delete a point when a row's delete button is clicked", async () => {

    const { getAllByRole, queryByText, rerender } = render(
        <Table points={points} planId={planId} setPoints={setPoints} yAxis={yAxis} />
      );

    const deleteBtn = getAllByRole('button')[2];

    await act(async () => {
        fireEvent.click(deleteBtn);
    });

    await waitFor(() => {
        const updatedPoints: any = updatePoints(planId)

        rerender(<Table points={updatedPoints} planId={planId} setPoints={setPoints} yAxis={yAxis} />);
        
        expect(queryByText('19')).not.toBeInTheDocument();
        expect(queryByText('2022-02-28')).not.toBeInTheDocument();
    })
  });

  test('should toggle edit mode and update a point on blur', async () => {

    const { getAllByRole, getByDisplayValue, rerender, queryByText } = render(
        <Table points={points} planId={planId} setPoints={setPoints} yAxis={yAxis} />
    );

    const editBtn = getAllByRole('button')[1]

    fireEvent.click(editBtn)

    const valueInput = getByDisplayValue('19')

    fireEvent.change(valueInput, { target: { value: "21" } });

    await waitFor(() => 
        expect(setPoints).toHaveBeenCalledWith(expect.arrayContaining([{_id: "1", date: "2023-02-28", value: "21"}]))
    )  

    await act(async () => {
        fireEvent.blur(valueInput);
    });

    await waitFor(() => {
        const updatedPoints: any = updatePoints(planId)

        rerender(<Table points={updatedPoints} planId={planId} setPoints={setPoints} yAxis={yAxis} />);

        expect(queryByText('19')).not.toBeInTheDocument();
        expect(queryByText('21')).toBeInTheDocument();
        expect(queryByText('2023-02-28')).toBeInTheDocument();
    })
  })
})
