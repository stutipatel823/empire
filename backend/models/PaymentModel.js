const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PaymentSchema = new Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentDate: Date,
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);