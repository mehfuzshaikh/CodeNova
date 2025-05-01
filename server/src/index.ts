import express from 'express';
import './db/config';
import cors from 'cors'
import userRouter from './routes/userRouter';


const app = express();

app.use(cors({
    origin: 'http://localhost:3001'
}))

app.use(express.json());

app.use('/api/v1/user',userRouter);

app.listen(process.env.PORT, () => console.log('Server running on http://localhost:5000'));
