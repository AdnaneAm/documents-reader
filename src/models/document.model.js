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
      required: true,
      trim: true,
      enum:['pending','approved','declined']
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

// add plugin that converts mongoose to json
documentSchema.plugin(toJSON);
documentSchema.plugin(paginate);


module.exports = documentSchema;
