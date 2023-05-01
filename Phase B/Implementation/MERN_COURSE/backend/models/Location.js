const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
});

locationSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

locationSchema.set('toJSON', {
    virtuals: true,
});

exports.Location = mongoose.model('Location', locationSchema);
exports.locationSchema = locationSchema;