export class Project {
    constructor(
        public readonly id: string,
        public readonly group_id: string,
        public readonly supervisor_id: string,
        public readonly title: string,
        public readonly abstract: string,
        public readonly repository_url: string,
        public readonly final_grade: number | null,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}
}
