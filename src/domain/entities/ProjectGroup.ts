export enum Visibility {
    PUBLIC = "public",
    PRIVATE = "private",
}

export enum Status {
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
    status: Status;
    invite_code: string;
    createdAt: Date;
    updatedAt: Date;
   
}