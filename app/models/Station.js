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
    closeHour: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Station = mongoose.model('Station', stationSchema);

module.exports = Station;