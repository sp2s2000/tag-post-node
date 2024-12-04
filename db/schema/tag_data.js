const mongoose = require('mongoose');

// Define the schema for individual data entries
const dataSchema = new mongoose.Schema({
  CRC: { type: String, required: false },
  MAC: { type: String, required: false },
  PC: { type: String, required: false },
  TID: { type: String, required: false },
  USER: { type: String, required: false },
  antenna: { type: Number, required: false },
  channel: { type: Number, required: false },
  eventNum: { type: Number, required: false },
  format: { type: String, required: false },
  hostName: { type: String, required: false },
  idHex: { type: String, required: true },
  peakRssi: { type: Number, required: false },
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
