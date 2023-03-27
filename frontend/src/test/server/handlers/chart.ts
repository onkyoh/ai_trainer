import { rest } from 'msw'
import { PLAN_URL } from '../../../utils/constants'
import { TEST_PLAN } from '../../testUtils'
import { db } from '../db'


export const chartHandlers = [
    rest.put(`${PLAN_URL}/:planId`, async (req, res, ctx) => {

      const { planId } = req.params;
      const point = await req.json();
  
      if (!planId) {
        return res(ctx.status(400), ctx.json({ success: false, message: 'Error creating point' }));
      }
  
      if (!point || !point.date) {
        return res(ctx.status(400), ctx.json({ success: false, message: 'Date required' }));
      }
  
      if (!point.value || isNaN(parseInt(point.value))) {
        return res(ctx.status(400), ctx.json({ success: false, message: 'Value must be a number' }));
      }
  
      const updatedPoints = [...TEST_PLAN.tracker.points, {...point, _id: '4'}];

        const plan = db.plan.update({
            where: {
                _id: {
                    equals: planId as string
                }
            },
            data: {
                ...TEST_PLAN,
                tracker: {
                    ...TEST_PLAN.tracker,
                    points: updatedPoints,
                }
            }
        });


      if (!plan) {
        return res(ctx.status(404), ctx.json({ success: false, message: 'Could not find plan' }));
      }
  
      return res(ctx.status(200), ctx.json({ success: true, message: 'Point added' }));
    }),
  
    rest.put(`${PLAN_URL}/:planId/:pointId`, async (req, res, ctx) => {
            
        const { planId, pointId } = req.params;
        const point = await req.json();
  
  
      if (!planId || !pointId) {
        return res(ctx.status(400), ctx.json({ success: false, message: 'Error updating point' }));
      }
  
      if (!point || !point.date) {
        return res(ctx.status(400), ctx.json({ success: false, message: 'Date required' }));
      }
  
      if (!point.value || isNaN(parseInt(point.value))) {
        return res(ctx.status(400), ctx.json({ success: false, message: 'Value must be a number' }));
      }
  
      const updatedPoints = TEST_PLAN.tracker.points.map(existingPoint => {
        if (existingPoint._id === pointId) {
          return { ...point, value: '21' };
        }
        return existingPoint;
      });

      db.plan.update({
        where: {
            _id: {
                equals: planId as string
            }
        },
        data: {
            ...TEST_PLAN,
            tracker: {
                ...TEST_PLAN.tracker,
                points: updatedPoints,
            }
        }
    });
  
      return res(ctx.status(200), ctx.json({ success: true, message: 'Point updated' }));
    }),
  
    rest.delete(`${PLAN_URL}/:planId/:pointId`, async (req, res, ctx) => {
       
        const { planId, pointId } = req.params;
  
      if (!planId || !pointId) {
        return res(ctx.status(400), ctx.json({ success: false, message: 'Error deleting point' }));
      }

      const updatedPoints = TEST_PLAN.tracker.points.filter(existingPoint => existingPoint._id !== pointId);

      db.plan.update({
        where: {
            _id: {
                equals: planId as string
            }
        },
        data: {
            ...TEST_PLAN,
            tracker: {
                ...TEST_PLAN.tracker,
                points: updatedPoints,
            }
        }
      })
  
      return res(ctx.status(200), ctx.json({ success: true, message: 'Point deleted' }));
    }),
  ];