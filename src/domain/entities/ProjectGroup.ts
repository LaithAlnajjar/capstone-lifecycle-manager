export enum Visibility {
    PUBLIC = "public",
    PRIVATE = "private",
}

export enum ProjectGroupStatus {
    FORMING = "forming",
    BIDDING = "bidding",
    ACTIVE = "active",
    COMPLETED = "completed",
}

export class ProjectGroup {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly term_id: string,
        public readonly visibility: Visibility,
        public readonly status: ProjectGroupStatus,
        public readonly invite_code: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}
}