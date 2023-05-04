const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// .env
dotenv.config();
// .env

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@cluster0.uyilinj.mongodb.net/workoutDB?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Create a schema for the workouts model
const WorkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Strength Training', 'Cardio', 'Yoga'],
        required: true,
    },
    difficulty: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    equipment: {
        type: String,
        required: false,
    },
});

// Create a model for the workouts collection
const Workout = mongoose.model('workouts', WorkoutSchema);

// Create an Express.js app
const app = express();

// Set up middleware to parse JSON in requests
app.use(express.json());

// Define API routes

// Get all workouts
app.get('/workouts', async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific workout by ID
app.get('/workouts/:id', getWorkout, (req, res) => {
    res.json(res.workout);
});

// Create a new workout
app.post('/workouts', async (req, res) => {
    const workout = new Workout(req.body);
    try {
        const newWorkout = await workout.save();
        res.status(201).json(newWorkout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a specific workout by ID
app.patch('/workouts/:id', getWorkout, async (req, res) => {
    if (req.body.name) {
        res.workout.name = req.body.name;
    }
    if (req.body.description) {
        res.workout.description = req.body.description;
    }
    if (req.body.type) {
        res.workout.type = req.body.type;
    }
    if (req.body.difficulty) {
        res.workout.difficulty = req.body.difficulty;
    }
    if (req.body.duration) {
        res.workout.duration = req.body.duration;
    }
    if (req.body.equipment) {
        res.workout.equipment = req.body.equipment;
    }
    try {
        const updatedWorkout = await res.workout.save();
        res.json(updatedWorkout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a specific workout by ID
app.delete('/workouts/:id', getWorkout, async (req, res) => {
    try {
        await res.workout.remove();
        res.json({ message: 'Workout deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a specific workout by ID
async function getWorkout(req, res, next) {
    let workout;
    try {
        workout = await Workout.findById(req.params.id);
        if (workout == null) {
            return res.status(404).json({ message: 'Workout not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.workout = workout;
    next();
}
