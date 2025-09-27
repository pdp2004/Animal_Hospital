const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  duration: {
    type: Number,
    required: true,
    default: 30
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['consultation', 'treatment', 'checkup', 'surgery', 'therapy'],
    default: 'consultation'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);