export interface routine_trakin_type {
    id: string;
    routineId: string;
    userId: string;
    dateCreate: string;
    state: 'create' | 'active' | 'completed';
}

export interface response_routine_trakin_type {
    id: string;
    routineId: string;
    dateCreate: string;
    state: string;
}