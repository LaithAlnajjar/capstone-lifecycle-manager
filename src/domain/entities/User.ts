export enum Role {
    STUDENT = "student",
    SUPERVISOR = "supervisor",
    ADMIN = "admin",
}



export class User {
    constructor(
        public readonly id: string, 
        public readonly name: string, 
        public readonly email: string, 
        public readonly emailVerified: boolean, 
        public readonly image: string, 
        public readonly createdAt: Date, 
        public readonly updatedAt: Date, 
        public readonly role: Role,
        public readonly groupId?: string
    ) {}
}