import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jobRoutes from './routes/jobs.js';

import authRoutes from './routes/auth.js'; // Add `.js` extension when using ESM

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('🎉 Welcome to the Hire Hub App Backend!');
});

app.use('/api/jobs', jobRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    })
  )
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
  });
