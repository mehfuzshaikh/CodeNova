import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from TypeScript backend! 🎉');
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
