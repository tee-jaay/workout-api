import mongoose from "mongoose";

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

export default Workout;