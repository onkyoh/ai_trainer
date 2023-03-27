const { 
    testSetup, 
    mockPlans, 
    formBody 
} = require('../test-utils');
const {
    getPlans,
    createPlan,
    deletePlan,
    addPoint,
    updatePoint,
    deletePoint
} = require('../../controllers/planController')
const Plan = require('../../models/planModel')
const openai = require('../../config/openai');
const mongoose = require('mongoose');

testSetup()

describe('/plans', () => {
    let req;
    let res;
  
    beforeEach(() => {

        const planId = mongoose.Types.ObjectId()
        const pointId = mongoose.Types.ObjectId()

      req = {
        body: {},
        user: { id: 'user123' },
        params: {
            planId,
            pointId
        }
      };
      res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      };
    });

    describe('GET', () => {
        test('should return 401 and error message if user is not logged in', async () => {
            req.user.id = null
        
            await getPlans(req, res)
        
            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.send).toHaveBeenCalledWith({
              success: false,
              message: 'Must be logged in',
            })
          })
        
          test('should return all plans belonging to the logged in user', async () => {
            jest.spyOn(Plan, 'find').mockResolvedValue(mockPlans)
        
            await getPlans(req, res)
        
            expect(Plan.find).toHaveBeenCalledWith({ ownerId: 'user123' })
            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.send).toHaveBeenCalledWith({
              success: true,
              message: 'Plans fetched',
              data: mockPlans
            })
          })
    })

    describe('POST', () => {

        test('should return 401 if missing fields', async () => {

            req.body = {...formBody}
            delete req.body.days
        
            await createPlan(req, res);
        
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({
              success: false,
              message: 'Missing fields.'
            });
          });

       
        test('should return 500 if error occurs while creating plan', async () => {

            req.body = {...formBody}

            jest.spyOn(openai, 'createCompletion').mockReturnValue(null);

            await createPlan(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                success: false,
                message: 'Error creating plan'
            });
        });

        test('should return 201 and send plan data back', async () => {
            req.body = {...formBody}
            req.user.id = 'user123'

            const plan = [{ name: 'Test Exercise', sets: 3, reps: 10 }]

            const completion = {
                data: {
                  choices: [
                    {
                      text: JSON.stringify(plan),
                    }
                  ],
                },
              };

            const data = {
                name: req.body.name,
                plan,
                tracker: {
                  yAxis: req.body.yAxis
                },
                ownerId: req.user.id
              }

            jest.spyOn(openai, 'createCompletion').mockReturnValue(completion);
            jest.spyOn(Plan, 'create').mockResolvedValue(data);
          
              await createPlan(req, res);
          
              expect(res.status).toHaveBeenCalledWith(201);
              expect(res.send).toHaveBeenCalledWith({
                success: true,
                message: 'Plan created',
                data: data
              });
        })
    })

    describe('/:planId', () => {
        
        describe('DELETE', () => {

            test('should return 404 when error deleting plan', async () => {

                jest.spyOn(Plan, 'findById').mockResolvedValue(true)

                await deletePlan(req, res)

                expect(res.status).toHaveBeenCalledWith(500)
                expect(res.send).toHaveBeenCalledWith({
                  success: false,
                  message: 'Error deleting plan'
                })
            })

            test('should return 200 when plan deleted', async () => {

                jest.spyOn(Plan, 'findById').mockResolvedValue(false)

                await deletePlan(req, res)

                expect(res.status).toHaveBeenCalledWith(200)
                expect(res.send).toHaveBeenCalledWith({
                  success: true,
                  message: 'Plan deleted'
                })
            })
        })
        
        describe('PUT', () => {

            beforeEach(() => {
                req.body = {
                    date: '2023-03-25',
                    value: '20'
                  }
            })
            test('should return 400 if planId or point is missing', async () => {
                delete req.params.planId;
                delete req.body.point;
            
                await addPoint(req, res);
            
                expect(res.status).toHaveBeenCalledWith(400);
                expect(res.send).toHaveBeenCalledWith({
                  success: false,
                  message: 'Error creating point'
                });
              });
            
              test('should return 400 if date is missing', async () => {
                delete req.body.date;
            
                await addPoint(req, res);
            
                expect(res.status).toHaveBeenCalledWith(400);
                expect(res.send).toHaveBeenCalledWith({
                  success: false,
                  message: 'Date required'
                });
              });
            
              test('should return 400 if value is missing', async () => {
                delete req.body.value;
            
                await addPoint(req, res);
            
                expect(res.status).toHaveBeenCalledWith(400);
                expect(res.send).toHaveBeenCalledWith({
                  success: false,
                  message: 'Value required'
                });
              });
            
              test('should return 400 if value is not a number', async () => {
                req.body.value = 'abc';
            
                await addPoint(req, res);
            
                expect(res.status).toHaveBeenCalledWith(400);
                expect(res.send).toHaveBeenCalledWith({
                  success: false,
                  message: 'Value must be a number'
                });
              });
            
              test('should return 404 if plan does not exist', async () => {
                
                jest.spyOn(Plan, 'findByIdAndUpdate').mockReturnValue(null);
            
                await addPoint(req, res);
            
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.send).toHaveBeenCalledWith({
                  success: false,
                  message: 'Could not find plan'
                });
              });
            
              test('should add point to plan and return 200 if request is valid', async () => {
                jest.spyOn(Plan, 'findByIdAndUpdate').mockReturnValue({});
            
                await addPoint(req, res);
            
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.send).toHaveBeenCalledWith({
                  success: true,
                  message: 'Point added'
                });
              });
        })

        describe('/:pointId', () => {
            beforeEach(() => {
                req = {
                  params: {
                    planId: '123',
                    pointId: '456'
                  },
                  body: {
                    date: '2022-01-01',
                    value: '10'
                  }
                }
            })
            describe('PUT', () => {
                test('should return an error if planId, pointId, or point is missing', async () => {
                    delete req.params.planId
                    await updatePoint(req, res)
                
                    expect(res.status).toHaveBeenCalledWith(400)
                    expect(res.send).toHaveBeenCalledWith({
                        success: false,
                        message: 'Error updating point'
                    })
                })
                
                test('should return an error if date is missing', async () => {
                    delete req.body.date
                    await updatePoint(req, res)
                
                    expect(res.status).toHaveBeenCalledWith(400)
                    expect(res.send).toHaveBeenCalledWith({
                        success: false,
                        message: 'Date required'
                    })
                })
                
                test('should return an error if value is missing', async () => {
                    delete req.body.value
                    await updatePoint(req, res)
                
                    expect(res.status).toHaveBeenCalledWith(400)
                    expect(res.send).toHaveBeenCalledWith({
                        success: false,
                        message: 'Value required'
                    })
                })
            
                test('should return an error if value is not a number', async () => {
                    req.body.value = 'abc'
                    await updatePoint(req, res)
                
                    expect(res.status).toHaveBeenCalledWith(400)
                    expect(res.send).toHaveBeenCalledWith({
                        success: false,
                        message: 'Value must be a number'
                    })
                })
            
                test('should update the point successfully', async () => {
                    jest.spyOn(Plan, 'findOneAndUpdate').mockResolvedValue({})
                
                    await updatePoint(req, res)
                
                    expect(Plan.findOneAndUpdate).toHaveBeenCalledWith(
                        { _id: '123' },
                        { $set: { 'tracker.points.$[idx]': { date: '2022-01-01', value: '10' } } },
                        { arrayFilters: [{ 'idx._id': '456' }], runValidators: true }
                    )
                    expect(res.status).toHaveBeenCalledWith(200)
                    expect(res.send).toHaveBeenCalledWith({
                        success: true,
                        message: 'Point updated'
                    })
                })
            
                test('should return an error if the plan is not found', async () => {
                    jest.spyOn(Plan, 'findOneAndUpdate').mockResolvedValue(null)
                
                    await updatePoint(req, res)
                
                    expect(Plan.findOneAndUpdate).toHaveBeenCalledWith(
                        { _id: '123' },
                        { $set: { 'tracker.points.$[idx]': { date: '2022-01-01', value: '10' } } },
                        { arrayFilters: [{ 'idx._id': '456' }], runValidators: true }
                    )
                    expect(res.status).toHaveBeenCalledWith(404)
                    expect(res.send).toHaveBeenCalledWith({
                        success: false,
                        message: 'Could not find plan'
                    })
                })
            })

            describe('DELETE', () => {
                test('should return 400 if planId or pointId are not provided', async () => {
                    delete req.params.planId;
                    await deletePoint(req, res);
                    expect(res.status).toHaveBeenCalledWith(400);
                    expect(res.send).toHaveBeenCalledWith({
                      success: false,
                      message: 'Error deleting point'
                    });
                
                    req.params.planId = 'planId123';
                    delete req.params.pointId;
                    await deletePoint(req, res);
                    expect(res.status).toHaveBeenCalledWith(400);
                    expect(res.send).toHaveBeenCalledWith({
                      success: false,
                      message: 'Error deleting point'
                    });
                  });
                
                test('should return 404 if plan is not found', async () => {
                    jest.spyOn(Plan, 'findOneAndUpdate').mockResolvedValueOnce(null);
                    await deletePoint(req, res);
                    expect(res.status).toHaveBeenCalledWith(404);
                    expect(res.send).toHaveBeenCalledWith({
                        success: false,
                        message: 'Could not find plan'
                    });
                });
            
                test('should delete the point and return success message', async () => {
                    jest.spyOn(Plan, 'findOneAndUpdate').mockResolvedValueOnce({});
                    await deletePoint(req, res);
                    expect(Plan.findOneAndUpdate).toHaveBeenCalledWith(
                        { _id: '123' },
                        { $set: { 'tracker.points.$[idx]': { date: '2022-01-01', value: '10' } } },
                        { arrayFilters: [{ 'idx._id': '456' }], runValidators: true }
                    );
                    expect(res.status).toHaveBeenCalledWith(200);
                    expect(res.send).toHaveBeenCalledWith({
                        success: true,
                        message: 'Point deleted'
                    });
                }); 
            })

        })   
    })
})
  