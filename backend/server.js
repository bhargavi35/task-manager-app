// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); // ✅ Load .env before anything else

const connectDB = require('./database/db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(); // uses process.env.MONGO_URI

app.use(cors());
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
