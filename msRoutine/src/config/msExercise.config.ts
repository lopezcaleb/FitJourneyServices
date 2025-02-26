import axios from "axios";

export const msExerciseConfig = axios.create({
    baseURL: process.env.MS_JOURNEY_MS_EXERCISE,
});

