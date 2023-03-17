const Plan = require('../models/planModel')
const openai = require('../config/openai')
const { promptFormatter } = require('../utils/promptFormatter')

const getPlans = async(req,res) => {
    const ownerId = req.user.id
    if (!ownerId) {
        return res.status(401).send({
            success: false,
            message: 'Must be logged in'
        })
    }
    const plans = await Plan.find({ownerId})
    res.status(201).send({
        success: true,
        message: 'Plans fetched',
        data: plans
    })
}

const createPlan = async(req,res) => {

    const {days, name, equipment, goal, yAxis} = req.body

    if (!days || !name || !goal || !yAxis) {
        return res.status(400).send({
            success: false,
            message: 'Missing fields.'
        })
    }

    const prompt = promptFormatter(days, equipment, goal)

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 2048
      });

    let preConfig = completion.data.choices[0].text;
    const idx1 = preConfig.indexOf("[");
    const idx2 = preConfig.lastIndexOf("]") + 1;
    const plan = JSON.parse(preConfig.substring(idx1, idx2));

    const newPlan = await Plan.create({
        name,
        plan,
        tracker: {
            yAxis
        },
        ownerId: req.user.id
    })

    if (newPlan) {
        res.status(201).send({
            success: true,
            message: 'Plan created',
            data: newPlan
        })
    } else {
        res.status(500).send({
            success: false,
            message: 'Error creating plan'
        })
    }
}

const deletePlan = async(req,res) => {
    const { planId } = req.params

    await Plan.findByIdAndDelete(planId)

    const stillExists = await Plan.findById(planId)

    if (stillExists) {
        return res.status(500).send({
            success: false,
            message: 'Error deleting plan'
        })
    } else {
        return res.status(200).send({
            success: true,
            message: 'Plan deleted'
        })
    }
}

const addPoint = async(req,res) => {

    const { planId } = req.params

    const point = req.body

    if ( !planId || !point) {
        return res.status(400).send({
            success: false,
            message: 'Error creating point'
        })
    }

    if (!point.date) {
        return res.status(400).send({
            success: false,
            message: 'Date required'
        }) 
    }

    if (!point.value) {
        return res.status(400).send({
            success: false,
            message: 'Value required'
        }) 
    }

    if (isNaN(parseInt(point.value))) {
        return res.status(400).send({
            success: false,
            message: 'Value must be a number'
        }) 
    }

    const plan = await Plan.findByIdAndUpdate(
        planId,
        {
            $push: {
                "tracker.points": point
            }
        },
        {
            runValidators: true
        }
    )

    if (!plan) {
        return res.status(404).send({
            success: false,
            message: 'Could not find plan'
        })
    }

    res.status(200).send({
        success: true,
        message: 'Point added',
    })

}

const updatePoint = async(req,res) => {

    const { planId, pointId } = req.params
    const point = req.body

    if ( !planId || !point || !pointId) {
        return res.status(400).send({
            success: false,
            message: 'Error updating point'
        })
    }

    if (!point.date) {
        return res.status(400).send({
            success: false,
            message: 'Date required'
        }) 
    }

    if (!point.value) {
        return res.status(400).send({
            success: false,
            message: 'Value required'
        }) 
    }

    if (isNaN(parseInt(point.value))) {
        return res.status(400).send({
            success: false,
            message: 'Value must be a number'
        }) 
    }

    const plan = await Plan.findOneAndUpdate(
        {
            _id: planId
        },
        {
            $set: {
                "tracker.points.$[idx]": point
            }
        },
        {
            arrayFilters: [
                {"idx._id": pointId}
            ],
            runValidators: true
        }
    )

    if (!plan) {
        return res.status(404).send({
            success: false,
            message: 'Could not find plan'
        })
    }

    res.status(200).send({
        success: true,
        message: 'Point updated'
    })
}

const deletePoint = async(req,res) => {

    const { planId, pointId } = req.params

    if ( !planId || !pointId) {
        return res.status(400).send({
            success: false,
            message: 'Error deleting point'
        })
    }

    const plan = await Plan.findOneAndUpdate(
        {
            _id: planId
        },
        {
            $pull: {
                "tracker.points": {_id: pointId}
            }
        }
    )

    if (!plan) {
        return res.status(404).send({
            success: false,
            message: 'Could not find plan'
        })
    }

    res.status(200).send({
        success: true,
        message: 'Point deleted'
    })
}

module.exports = {
    getPlans,
    createPlan,
    deletePlan,
    addPoint,
    updatePoint,
    deletePoint
}