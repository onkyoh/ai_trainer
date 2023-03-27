const stopServer = require('../server')
const { closeDB } = require('../config/db')

const testSetup = () => {
    afterAll(async () => {
      await stopServer()
      await closeDB()
    })
}

const mockPlans = [
  {
    title: 'Plan 1', ownerId: 'user123'
  }, 
  { 
    title: 'Plan 2', ownerId: 'user123' 
  }
]

const formBody = {
  days: '4', name: 'Test Plan', equipment: 'weights-focused', goal: 'Gain strength', yAxis: 'Weight (kg)'
};

module.exports = {
  testSetup,
  mockPlans,
  formBody
}