export enum AcademicTermStatus {
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
    status: AcademicTermStatus;
    max_group_size: number;
}