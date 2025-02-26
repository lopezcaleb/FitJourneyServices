export interface ResponseInsertRoutineTrakingExercise {
    id:               string;
    routineTrakingId: string;
    exerciseId:       string;
    series:           any[];
}
export interface RequestInsertRoutineTrakingExercise {
    routineTrakingId: string;
    exerciseId:       string;
}
