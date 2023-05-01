const mongoose = require('mongoose');



const flyOrderSchema = new mongoose.Schema({
    orderNumber: {
        type: Number,
        required: true,
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    courier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courier'
    },
    submitDate: {
        type: String,
        required: true,
    },
    submitHour: {
        type: String,
        required: true,
    },
    completedDate: {
        type: String,
        required: true,
    },
    customerPhoneNumber: {
        type: String,
        required: true,
    },
    origin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    status:{
        type: String,
        enum: ['PENDING', 'IN DELIVERY','FINISHED','REJECTED'],
        default : 'PENDING',
    }
});

flyOrderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

flyOrderSchema.set('toJSON', {
    virtuals: true,
});

exports.flyOrder = mongoose.model('flyOrder', flyOrderSchema);
exports.flyOrderSchema = flyOrderSchema;