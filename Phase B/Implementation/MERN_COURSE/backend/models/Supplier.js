const mongoose = require('mongoose');




const supplierSchema = new mongoose.Schema({
    
    status: {
        type: String,
        enum: ['type1', 'type2','type3'],
        default : 'type1',
    },
    ordersNo: {
        type: Number,
        required: true,
    },
    registirationDate: {
        type: Date,
        required: true,
        default : Date.now
    },
    companyName: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TheUsers'
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }

});

supplierSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

supplierSchema.set('toJSON', {
    virtuals: true,
});

exports.Supplier = mongoose.model('Supplier', supplierSchema);
//exports.supplierSchema = supplierSchema;