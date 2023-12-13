const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    openHour: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Station = mongoose.model('Station', stationSchema);

module.exports = Station;