// const express = require('express')
// const bodyparser = require('body-parser')
// const cors = require('cors')
// const dotenv = require('dotenv')
// const MongoClient = require('mongodb').MongoClient;
// dotenv.config();

// const url = process.env.MONGO_URI;
// const client = new MongoClient(url);
// const port = 3000
// const dbName = 'myproject';
// client.connect()
// const app = express()
// app.use(bodyparser.json())
// app.use(cors())


// app.get('/', async(req, res) => {
//     const db = client.db(dbName);
//     const collection = db.collection('document');
//     const findResult = await collection.find({}).toArray();
//     res.json(findResult);
// })
// app.post('/', async(req, res) => {
//     const db = client.db(dbName);
//     const password = req.body;
//     const collection = db.collection('document');
//     const findResult = await collection.insertOne(password);
//     res.send("success: true ");
// })
// app.delete('/', async(req, res) => {
//     const db = client.db(dbName);
//     const password = req.body;
//     const collection = db.collection('document');
//     const findResult = await collection.deleteOne(password);
//     res.send("success: true ");
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port http://localhost:${port}`)
// })

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/password_manager_db';
const JWT_SECRET = process.env.JWT_SECRET || 'f34ae563276cb4c690a575e8be50c6fa0318ccc6d7b4fff173e82d3ccc794d06';

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// Password Schema
const passwordSchema = new mongoose.Schema({
  site: { type: String, required: true },
  user: { type: String, required: true },
  password: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});
const Password = mongoose.model('Password', passwordSchema);

// Auth middleware to protect routes
const auth = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Signup route
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send({ msg: 'User created successfully' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).send({ msg: 'Username already exists' });
    }
    res.status(500).send({ msg: 'Server error' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send({ msg: 'Invalid credentials' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send({ msg: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Get passwords for the logged-in user
app.get('/api/passwords', auth, async (req, res) => {
  const passwords = await Password.find({ userId: req.userId });
  res.json(passwords);
});

// Add a new password
app.post('/api/passwords', auth, async (req, res) => {
  const { site, user, pass } = req.body;
  const newPassword = new Password({ site, user, password: pass, userId: req.userId });
  await newPassword.save();
  res.status(201).json(newPassword);
});

// Delete a password
app.delete('/api/passwords/:id', auth, async (req, res) => {
  await Password.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));