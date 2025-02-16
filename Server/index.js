const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoModel = require('./Models/todo');

const app = express();
const PORT = 3001;

// ✅ 1. Enable CORS for Vercel Frontend
app.use(cors({
  origin: 'https://todo-m1kx.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

// ✅ 2. MongoDB Atlas Connection
mongoose.connect('mongodb+srv://yassuopro316:<db_password>@cluster0.0ptbm.mongodb.net/todo?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Atlas connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ 3. API Routes
app.get('/get', async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.post('/add', async (req, res) => {
  try {
    const { task } = req.body;
    const newTodo = await todoModel.create({ task });
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await todoModel.findByIdAndDelete(id);
    res.json(deletedTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await todoModel.findByIdAndUpdate(id, { done: true }, { new: true });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// ✅ 4. Listener
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
