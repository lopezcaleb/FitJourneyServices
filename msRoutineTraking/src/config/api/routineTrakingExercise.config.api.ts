import axios from "axios";

const msRoutineTrakingExerciseHost = process.env.MS_JOURNEY_MS_ROUTINE_TRAKING_EXERCISE;

export const routineTrakingExerciseApiConfig = axios.create({
    baseURL: msRoutineTrakingExerciseHost
});