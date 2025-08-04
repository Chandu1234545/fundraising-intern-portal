const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const email = 'admin@example.com';
    const plainPassword = 'admin123';

    await User.deleteOne({ email });

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await User.create({
      name: 'Admin',
      email,
      password: hashedPassword,
      role: 'admin'
    });

    console.log('✅ Admin user created');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
