const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [
    {
      menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
      name: String,
      price: Number,
      qty: Number
    }
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },
  note: { type: String, default: '' }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
