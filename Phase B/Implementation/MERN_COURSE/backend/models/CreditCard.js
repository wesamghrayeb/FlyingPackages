const mongoose = require('mongoose');

const creditCardSchema = new mongoose.Schema({
    creditCardNumber: {
        type: String,
        required: true,
    },
    creditCardExpDate: {
        type: String,
        required: true,
    },
    creditCardCVV: {
        type: String,
        required: true,
    }
});

creditCardSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

creditCardSchema.set('toJSON', {
    virtuals: true,
});

exports.CreditCard = mongoose.model('CreditCard', creditCardSchema);
exports.creditCardSchema = creditCardSchema;