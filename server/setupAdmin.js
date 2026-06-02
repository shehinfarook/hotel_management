require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('./models/User')
const Restaurant = require('./models/Restaurant')

const setup = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')

    await User.deleteMany({ role: { $in: ['superadmin', 'admin'] } })
    await Restaurant.deleteMany({})

    const hashed = await bcrypt.hash('admin123', 10)

    await User.create({
      name: 'superadmin',
      email: 'superadmin123@gmail.com',
      password: hashed,
      role: 'superadmin'
    })

    const restaurant = await Restaurant.create({
      name: 'Restaurant',
      address: '',
      phone: ''
    })

    await User.create({
      name: 'admin',
      email: 'admin123@gmail.com',
      password: hashed,
      role: 'admin',
      restaurantId: restaurant._id
    })

    console.log('Done!')
    console.log('Super Admin: superadmin123@gmail.com / admin123')
    console.log('Admin:       admin123@gmail.com / admin123')
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

setup()
