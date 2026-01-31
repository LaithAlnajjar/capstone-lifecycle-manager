export enum MilestoneStatus {
    PLANNED = "planned",
    OPEN = "open",
    COMPLETED = "completed",
    OVERDUE = "overdue",
}

export interface Milestone {
    id: string;
    project_id: string;
    title: string;
    description: string;
    due_date: Date;
    status: MilestoneStatus;
    createdAt: Date;
    updatedAt: Date;
}
