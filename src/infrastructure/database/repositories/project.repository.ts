import { IProjectRepository } from "@/domain/repositories/project.repository";
import { Project } from "@/domain/entities/index";
import type { NodePgDatabase } from "drizzle-orm/node-postgres"; 
import * as schema from "@/infrastructure/database/schema";
import { eq } from "drizzle-orm";

export class ProjectRepository implements IProjectRepository {
    constructor(private readonly db: NodePgDatabase<typeof schema>) {}

    async findById(id: string): Promise<Project | null> {
        const row = await this.db.query.project.findFirst({
            where: eq(schema.project.id, id),
        });

        if (!row) return null;

        return new Project(
            row.id,
            row.group_id ?? "",
            row.supervisor_id ?? "",
            row.title,
            row.abstract,
            row.repository_url,
            row.final_grade,
            row.createdAt,
            row.updatedAt,
        );
    }
    async save(project: Project): Promise<Project> {
        const [row] = await this.db.insert(schema.project).values({
            id: project.id,
            group_id: project.groupId,
            supervisor_id: project.supervisorId,
            title: project.title,
            abstract: project.abstract,
            repository_url: project.repositoryUrl,
            final_grade: project.finalGrade,
        }).returning();

        return new Project(
            row.id,
            row.group_id ?? "",
            row.supervisor_id ?? "",
            row.title,
            row.abstract,
            row.repository_url,
            row.final_grade,
            row.createdAt,
            row.updatedAt,
        );
    }
}