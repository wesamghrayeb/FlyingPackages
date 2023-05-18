const mongoose = require('mongoose');


const billSchema = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    month: {
        type: String,
    },
    year: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['Done', 'Pending'],
        default : 'Pending',
    },
    amount: {
        type: Number,
        default : 0
    },
    ordersPerMonth: {
        type: Number,
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