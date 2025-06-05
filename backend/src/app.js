const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const notesRoutes = require('./routes/notes');
app.use('/api/notes', notesRoutes);

// Root route
app.get('/', (req, res) => res.send('API running'));

// Test API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



