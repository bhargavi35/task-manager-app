// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const setupRecurringTaskJob = require('./cron/recurringTasks');

dotenv.config();
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

setupRecurringTaskJob();
const allowedOrigins = [
  'http://localhost:3000',
  'https://task-manager-app-eight-mu.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("Welcome to taskmanager");
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
