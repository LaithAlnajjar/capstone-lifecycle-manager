import { ProjectGroup, ProjectGroupStatus, Visibility } from "@/domain/entities";
import { IProjectGroupRepository } from "@/domain/repositories/projectGroup.repository";
import { eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "@/infrastructure/database/schema";



export class ProjectGroupRepository implements IProjectGroupRepository {
    constructor(private readonly db: NodePgDatabase<typeof schema>) {}

    async findById(id: string): Promise<ProjectGroup | null> {
        const row = await this.db.query.projectGroup.findFirst({
            where: eq(schema.projectGroup.id, id),
        });

        if (!row) return null;

        return new ProjectGroup(
            row.id,
            row.name,
            row.term_id ?? "",
            row.visibility as Visibility,
            row.status as ProjectGroupStatus,
            row.invite_code,
            row.createdAt,
            row.updatedAt,
        );
    }

    async save(projectGroup: ProjectGroup): Promise<ProjectGroup> {
        const [row] = await this.db.insert(schema.projectGroup).values({
            id: projectGroup.id,
            name: projectGroup.name,
            term_id: projectGroup.term_id,
            visibility: projectGroup.visibility,
            status: projectGroup.status,
            invite_code: projectGroup.inviteCode,
        }).returning();

        return new ProjectGroup(
            row.id,
            row.name,
            row.term_id ?? "",
            row.visibility as Visibility,
            row.status as ProjectGroupStatus,
            row.invite_code,
            row.createdAt,
            row.updatedAt,
        );
    }
}