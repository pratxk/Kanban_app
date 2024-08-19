const mongoose = require('mongoose');


const boardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    // Add any other relevant fields for the board
  }, { timestamps: true, versionKey: false });


  const boardModel = mongoose.model('Board',boardSchema);

  module.exports = boardModel