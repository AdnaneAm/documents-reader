const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const documentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
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
    language: {
      type: String,
      required: true,
      trim: true,
      enum:['fra','eng']
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
    },
    created: {
      type: Date,
      required:true,
      default:Date.now
    }
  },
);
documentSchema.plugin(toJSON);
module.exports = documentSchema;
