import express from 'express';
import './db/config';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use((req, res, next) => {
    if (req.is('application/json')) {
        express.json()(req, res, next);
    } else {
        next();
    }
});
app.use(cookieParser()); // we store JWT in cookies so we have to use this

app.use('/api/v1/user',userRouter);

app.listen(process.env.PORT, () => console.log('Server running on http://localhost:5000'));
