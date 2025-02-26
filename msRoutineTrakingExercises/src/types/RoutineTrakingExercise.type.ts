export interface RoutineExerciseType {
    id: string;
    userId: string;
    routineTrakingId: string;
    exerciseId: string;
    series: SeriesType[];
    dateTime: string;
}

export interface ResRoutineExerciseType {
    id: string;
    routineTrakingId: string;
    exerciseId: string;
    series: SeriesType[];
}

export interface SeriesType {
    repetitions: number;
    weight: number;
    time: number;
    dateCreate: string;
}