const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const documentSchema = mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      enum:['relevé bancaire','facture','attestation de travail', 'autres']
    },
    status: {
      type: String,
      required: false,
      trim: true,
      enum:['pending','approved','declined'],
      default:'pending'
    },
    declineReason:{
      type: String,
      required: false,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);


module.exports = documentSchema;
