import { IUserRepository } from "@/domain/repositories/user.repository";
import { User, type Role } from "@/domain/entities/index";
import type { NodePgDatabase } from "drizzle-orm/node-postgres"; 
import * as schema from "@/infrastructure/database/schema";
import { eq } from "drizzle-orm";

export class UserRepository implements IUserRepository {
    constructor(private readonly db: NodePgDatabase<typeof schema>) {}

    async findById(id: string): Promise<User | null> {
        const row = await this.db.query.user.findFirst({
            where: eq(schema.user.id, id),
        });

        if (!row) return null;

        return new User(
       row.id,
       row.name,
       row.email,
       row.emailVerified,
       row.image ?? "",
       row.createdAt,
       row.updatedAt,
       row.role as Role,
       row.group_id ?? undefined,
        );
       
    }

    async save(user: User): Promise<User> {
        const [row] = await this.db.insert(schema.user).values({
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified,
            image: user.image,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            role: user.role,
            group_id: user.groupId ?? null,
        }).returning();

        return new User(
            row.id,
            row.name,
            row.email,
            row.emailVerified,
            row.image ?? "",
            row.createdAt,
            row.updatedAt,
            row.role as Role,
            row.group_id ?? undefined,
        );
    }
}
