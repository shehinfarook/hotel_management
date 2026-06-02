require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('./models/User')

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')

    await User.deleteMany({ role: { $in: ['superadmin', 'admin'] } })

    const hashed = await bcrypt.hash('admin123', 10)
    
    await User.create({
      name: 'superadmin',
      email: 'superadmin123@gmail.com',
      password: hashed,
      role: 'superadmin'
    })

    await User.create({
      name: 'admin',
      email: 'admin123@gmail.com',
      password: hashed,
      role: 'admin'
    })


    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

seed()
