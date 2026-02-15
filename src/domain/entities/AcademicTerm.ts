export enum AcademicTermStatus {
    UPCOMING = "upcoming",
    ACTIVE = "active",
    COMPLETED = "completed",
}

export class AcademicTerm {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly startDate: Date,
        public readonly endDate: Date,
        public readonly createdAt: Date,
        public readonly isActive: boolean,
        public readonly status: AcademicTermStatus,
        public readonly max_group_size: number,
    ) {}
}