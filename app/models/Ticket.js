const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    train: {
        type: Schema.Types.ObjectId,
        ref: 'Train',
        required: true
    },
    isValid: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
