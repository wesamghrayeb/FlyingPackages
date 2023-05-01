const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    hoursPerMonth: {
        type: Number,
        required: true,
    },
    deliveriesPerMonth: {
        type: Number,
        required: true,
    },
    efficiency: {
        type: Number,
        required: true,
    },
    courier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courier'
    },
});

ReviewSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

ReviewSchema.set('toJSON', {
    virtuals: true,
});

exports.Review = mongoose.model('Review', ReviewSchema);
exports.ReviewSchema = ReviewSchema;