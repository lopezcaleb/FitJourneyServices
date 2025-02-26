export interface exerciseType {
    id: string;
    name: string;
    muscleGroupId: string;
    trainingStyleId: string;
    imageUrl: string;
    details?: string;
};

export interface exerciseMuscleType {
    muscle: string;
}