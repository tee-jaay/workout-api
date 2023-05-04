import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import workoutRoutes from '../routes/workout/workout.routes.js'

// import { verifyLogin } from './middleware.js';

const app = express();

app.use([
    morgan('dev'),
    cors(),
    bodyParser.json(),
    express.json()
]);


// ---- Routes ----
// Root
app.get("/", (_req, res) => {
    res.send('Workout manager app\'s api.');
});

app.get('/health', (_req, res) => {
    res.status(200).json({ message: 'Success' });
});

// Workout
app.use('/api/v1/workouts', workoutRoutes);

// ---- Routes ----
app.use((_req, _res, next) => {
    const error = new Error('Resource Not Found');
    error.status = 404;
    next(error);
});

app.use((error, _req, res, _next) => {
    if (error.status) {
        return res.status(error.status).json({
            message: error.message,
        });
    }
    res.status(500).json({
        message: 'Something went wrong'
    });
});

export default app;