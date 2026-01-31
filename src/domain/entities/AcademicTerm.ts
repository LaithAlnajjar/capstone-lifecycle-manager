export enum Status {
    UPCOMING = "upcoming",
    ACTIVE = "active",
    COMPLETED = "completed",
}

export interface AcademicTerm {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    isActive: boolean;
    status: Status;
    max_group_size: number;
}