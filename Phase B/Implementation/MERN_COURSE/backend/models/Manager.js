const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TheUsers'
    }
});

managerSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

supplierSchema.set('toJSON', {
    virtuals: true,
});

exports.Manager = mongoose.model('Supplier', managerSchema);
exports.managerSchema = managerSchema;