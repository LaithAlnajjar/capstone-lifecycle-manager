export enum Role {
    STUDENT = "student",
    SUPERVISOR = "supervisor",
    ADMIN = "admin",
}

export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    role: Role;
}