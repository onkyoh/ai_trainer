const mongoose = require('mongoose')

const planSchema = mongoose.Schema({
    ownerId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    plan: {
        type: Array,
        required: true
    },
    tracker: {
        yAxis: String,
        points: [{
            pointId: mongoose.Types.ObjectId,
            value: String,
            date: String
        }]
    }
  
}, {
    timestamps: true
})

module.exports = mongoose.model('Plan', planSchema)