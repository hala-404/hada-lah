// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB Atlas using MONGODB_URI from .env
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Define User Schema
const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: String,
  username: String,
  firstName: String,
  lastName: String,
  photo: String,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Webhook endpoint to handle Clerk events
app.post('/clerk/webhook', async (req, res) => {
  const event = req.body;

  if (!event || !event.type) {
    return res.status(400).send('❌ Invalid event format');
  }

  try {
    const userData = event.data;

    if (event.type === 'user.created' || event.type === 'user.updated') {
      await User.findOneAndUpdate(
        { clerkId: userData.id },
        {
          clerkId: userData.id,
          email: userData.email_addresses?.[0]?.email_address || '',
          username: userData.username || '',
          firstName: userData.first_name || '',
          lastName: userData.last_name || '',
          photo: userData.image_url || '',
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`✅ User ${event.type}: ${userData.id}`);
    }

    if (event.type === 'user.deleted') {
      await User.findOneAndDelete({ clerkId: userData.id });
      console.log(`🗑️ User deleted: ${userData.id}`);
    }

    res.status(200).send('✅ Webhook processed');
  } catch (err) {
    console.error('❌ Error processing webhook:', err);
    res.status(500).send('Internal server error');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
