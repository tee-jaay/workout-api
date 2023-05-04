import Workout from "../models/workout.model.js";


// Get all workouts
export const index = async (_req, res) => {
    try {
        const workouts = await Workout.find();
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific workout by _ID
export const show = async (req, res) => {
    try {
        const workout = await Workout.find({ _id: req.params.id });
        res.status(200).json(workout);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Create a new workout
export const store = async (req, res) => {
    const workout = new Workout(req.body);
    try {
        const newWorkout = await workout.save();
        res.status(201).json(newWorkout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a specific workout by _ID
export const update = async (req, res) => {
    const { id } = req.params;
    const { name, description, type, difficulty, duration, equipment } = req.body;

    try {
        await Workout.findOneAndUpdate(
            { _id: id },
            {
                name, description, type, difficulty, duration, equipment
            }
        );
        const updatedProject = await Workout.findOne({ _id: id });
        res.status(200).json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a specific workout by _ID
export const destroy = async (req, res, _next) => {
    try {
        const result = await Workout.findByIdAndRemove({ _id: req.params.id });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
