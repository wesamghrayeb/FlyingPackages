const mongoose = require('mongoose');


const courierSchema = new mongoose.Schema({
    birthDate: {
        type: String,
        required: true,
    },
    hoursPerMonth: {
        type: Number,
        default : 0
    },
    deliveriesPerMonth: {
        type: Number,
        default : 0
    },
    availablityStatus: {
        type: String,
        enum: ['Available', 'Busy'],
        default : 'Available',
    },
    status: {
        type: String,
        enum: ['Ok', 'Warning'],
        default : 'Ok',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TheUsers'
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },

});

courierSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

courierSchema.set('toJSON', {
    virtuals: true,
});

exports.Courier = mongoose.model('Courier', courierSchema);
exports.courierSchema = courierSchema;