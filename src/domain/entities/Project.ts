export class Project {
    constructor(
        public readonly id: string,
        public readonly groupId: string,
        public readonly supervisorId: string,
        public readonly title: string,
        public readonly abstract: string,
        public readonly repositoryUrl: string,
        public readonly finalGrade: number | null,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}
}
