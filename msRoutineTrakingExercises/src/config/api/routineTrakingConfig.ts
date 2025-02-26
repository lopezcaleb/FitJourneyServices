import axios from "axios";

const host = process.env.MS_JOURNEY_MS_ROUTINE_TRAKING;

export const rotineTrakingnConfig = axios.create({
    baseURL: host
});