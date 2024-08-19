const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board', required: true
    },

    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress','completed'],
        default: 'pending'
    },

    completedAt: {
        type: Date
    },

}, { timestamps: true, versionKey: false });

const taskModel = mongoose.model('Task', taskSchema);
module.exports = taskModel;
