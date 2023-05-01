const mongoose = require('mongoose');


const billSchema = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    month: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['type1', 'type2','type3'],
        default : 'type1',
    },
    amount: {
        type: Number,
        required: true,
        default : 0
    },
    ordersPerMonth: {
        type: Number,
        required: true,
        default : 0
    }
});

billSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

billSchema.set('toJSON', {
    virtuals: true,
});

exports.Bill = mongoose.model('Bill', billSchema);
exports.billSchema = billSchema;