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

export interface ProjectGroup {
    id: string;
    name: string;
    term_id: string;
    visibility: Visibility;
    status: ProjectGroupStatus;
    invite_code: string;
    createdAt: Date;
    updatedAt: Date;
   
}