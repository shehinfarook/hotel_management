const Menu = require('../models/Menu')

exports.getMenu = async (req, res) => {
  try {
    const filter = req.query.restaurantId ? { restaurantId: req.query.restaurantId } : {}
    const items = await Menu.find(filter)
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.addItem = async (req, res) => {
  try {
    const restaurantId = req.user.restaurantId || req.body.restaurantId
    const item = await Menu.create({ ...req.body, restaurantId })
    res.status(201).json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.updateItem = async (req, res) => {
  try {
    const item = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!item) return res.status(404).json({ message: 'Item not found' })
    res.json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.deleteItem = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
