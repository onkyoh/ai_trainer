import { rest } from 'msw';
import { PLAN_URL } from '../../../utils/constants';
import { TEST_PLAN } from '../../testUtils';
import { db } from '../db';

export const planHandlers = [
  rest.get(PLAN_URL, async (req, res, ctx) => {
    const ownerId = TEST_PLAN.ownerId;

    const plans = db.plan.findMany({
        where: {
            ownerId: {
                equals: ownerId
            }
        }
    })

    return res(ctx.status(201), ctx.json({
      success: true,
      message: 'Plans fetched',
      data: plans
    }));
  }),

  rest.post(PLAN_URL, async (req, res, ctx) => {

    db.plan.create({...TEST_PLAN})

    return res(ctx.status(201), ctx.json({
        success: true,
        message: 'Plan created',
        data: TEST_PLAN
    }));
  }),
  
  rest.delete(`${PLAN_URL}/:planId`, async (req, res, ctx) => {
    
    const {planId} = req.params

    db.plan.delete({
        where: {
            _id: {
                equals: planId as string
            }
        }
    })
    return res(ctx.status(200), ctx.json({
        success: true,
        message: 'Plan deleted'
    }));
  })
];
