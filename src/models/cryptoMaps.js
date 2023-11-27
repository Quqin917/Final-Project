const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  cryptoName: {
    type: String,
    required: true,
  },
});

const cryptoMaps = mongoose.model('Crypto', cryptoSchema);

module.exports = cryptoMaps;
