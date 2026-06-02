const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const makeToken = (user) =>
  jwt.sign({ id: user._id, role: user.role, restaurantId: user.restaurantId }, process.env.JWT_SECRET, { expiresIn: '7d' })

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Email already in use' })
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed, role: role || 'user' })
    res.status(201).json({ token: makeToken(user), user: { id: user._id, name: user.name, role: user.role } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: 'Invalid credentials' })
    res.json({ token: makeToken(user), user: { id: user._id, name: user.name, role: user.role, restaurantId: user.restaurantId } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.me = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')
  res.json(user)
}
