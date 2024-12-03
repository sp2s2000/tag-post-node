const mongoose = require('mongoose');

// Define the schema for individual data entries
const dataSchema = new mongoose.Schema({
  CRC: { type: String, required: true },
  MAC: { type: String, required: true },
  PC: { type: String, required: true },
  TID: { type: String, required: true },
  USER: { type: String, required: true },
  antenna: { type: Number, required: true },
  channel: { type: Number, required: true },
  eventNum: { type: Number, required: true },
  format: { type: String, required: true },
  hostName: { type: String, required: true },
  idHex: { type: String, required: true },
  peakRssi: { type: Number, required: true },
  phase: { type: Number, required: false },
  reads: { type: Number, required: false },
}, { _id: false });

// Define the schema for records in the batch
const recordSchema = new mongoose.Schema({
  data: { type: dataSchema, required: true },
  timestamp: { type: Date, required: true },
  type: { type: String, required: true },
}, { _id: false });

// Define the schema for the batch
const batchSchema = new mongoose.Schema({
  records: { type: [recordSchema], required: true },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create the model
const BatchTagData = mongoose.model('BatchTagData', batchSchema);

module.exports = BatchTagData;
