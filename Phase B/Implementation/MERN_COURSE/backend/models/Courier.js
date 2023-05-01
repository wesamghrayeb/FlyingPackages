const mongoose = require('mongoose');

const availablityStatus = {
    TYPE1: 'type1',
    TYPE2: 'type2',
    TYPE3: 'type3'
}

const status = {
    TYPE1: 'type1',
    TYPE2: 'type2',
    TYPE3: 'type3'
}

const courierSchema = new mongoose.Schema({
    birthDate: {
        type: String,
        required: true,
    },
    hoursPerMonth: {
        type: Number,
        required: true,
        default : 0
    },
    deliveriesPerMonth: {
        type: Number,
        required: true,
        default : 0
    },
    availablityStatus: {
        type: String,
        enum: ['type1', 'type2','type3'],
        default : 'type1',
    },
    status: {
        type: String,
        enum: ['type1', 'type2','type3'],
        default : 'type1',
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