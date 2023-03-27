import { IPlan } from "../types";
import { db } from "./server/db";

export const TEST_PLAN: IPlan = {
    _id: 'plan-123',
    ownerId: '123',
    name: 'test-plan',
    plan: [
        {
            label: 'Day 1',
            exercises: [
                {
                    name: 'Bench Press',
                    amount: '3x5'
                }
            ]
        }
    ],
    tracker: {
        yAxis: 'yAxis value',
        points: [
            {
                value: "19",
                date :"2023-02-28",
                _id: "1"
            },
            {
                value: "48",
                date :"2023-03-01",
                _id: "2"
            },
            {
                value: "100",
                date :"2023-03-02",
                _id: "3"
            }
        ]
    }
}

export const updatePoints = (planId: string) => {
        const updatedPlan = db.plan.findFirst({
        where: {
            _id: {
            equals: planId
            }
        }
        })
    if (updatedPlan?.tracker?.points) {
        return [...updatedPlan.tracker.points]
    }
}

export const initializePlan = () => {
    db.plan.create(TEST_PLAN)
}