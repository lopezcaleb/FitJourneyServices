import axios from "axios";

const msRoutineHost = process.env.MS_JOURNEY_MS_ROUTINE;

export const routineApiConfig = axios.create({
    baseURL: msRoutineHost
});