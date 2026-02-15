export enum MilestoneStatus {
    PLANNED = "planned",
    OPEN = "open",
    COMPLETED = "completed",
    OVERDUE = "overdue",
}

export class Milestone {
    constructor(
        public readonly id: string,
        public readonly project_id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly due_date: Date,
        public readonly status: MilestoneStatus,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}
}
