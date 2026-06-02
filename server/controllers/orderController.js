const Order = require('../models/Order')

const ORDER_FLOW = ['pending', 'confirmed', 'preparing', 'ready', 'delivered']

exports.placeOrder = async (req, res) => {
  try {
    const { items, restaurantId, note } = req.body
    const totalAmount = items.reduce((sum, i) => sum + i.price * i.qty, 0)
    const order = await Order.create({ userId: req.user.id, restaurantId, items, totalAmount, note })
    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.restaurantOrders = async (req, res) => {
  try {
    const restaurantId = req.user.restaurantId || req.query.restaurantId
    const orders = await Order.find({ restaurantId }).populate('userId', 'name email').sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })

    const currentIdx = ORDER_FLOW.indexOf(order.status)
    const newIdx = ORDER_FLOW.indexOf(status)

    if (status !== 'cancelled' && newIdx !== currentIdx + 1)
      return res.status(400).json({ message: `Cannot move from ${order.status} to ${status}` })

    order.status = status
    await order.save()
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.allOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('restaurantId', 'name')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
