const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const {
    getPlans,
    createPlan,
    deletePlan,
    addPoint,
    updatePoint,
    deletePoint
} = require('../controllers/planController')

router.route('/').get(protect, getPlans).post(protect, createPlan)
router.route('/:planId').delete(protect, deletePlan).put(protect, addPoint)
router.route('/:planId/points/:pointId').put(protect, updatePoint).delete(protect, deletePoint)

module.exports = router;