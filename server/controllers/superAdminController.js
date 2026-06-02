const Restaurant = require('../models/Restaurant')
const User = require('../models/User')

exports.getAll = async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
    res.json(restaurants)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.create = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body)
    res.status(201).json(restaurant)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.update = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(restaurant)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.remove = async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.assignAdmin = async (req, res) => {
  try {
    const { userId, restaurantId } = req.body
    const user = await User.findByIdAndUpdate(userId, { role: 'admin', restaurantId }, { new: true }).select('-password')
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
