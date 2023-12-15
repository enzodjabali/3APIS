const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    startStation: {
        type: Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },
    endStation: {
        type: Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },
    imageReference: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;
