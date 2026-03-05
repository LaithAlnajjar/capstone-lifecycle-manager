import { IProjectRepository, ISubmissionRepository } from "@/domain/repositories/project.repository";
import { Project, Submission, SubmissionStatus } from "@/domain/entities/index";
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

export class SubmissionRepository implements ISubmissionRepository {
    constructor(private readonly db: NodePgDatabase<typeof schema>) {}

    async findById(id: string): Promise<Submission | null> {
        const row = await this.db.query.submission.findFirst({
            where: eq(schema.submission.id, id),
        })

        if (!row) return null;

        return new Submission(
            row.id,
            row.milestone_id ?? "",
            row.submitted_by ?? "",
            row.file_url,
            row.version_number,
            row.timestamp,
            row.status as SubmissionStatus,
        );
    }

    async save(submission: Submission): Promise<Submission> {
        const [row] = await this.db.insert(schema.submission).values({
            id: submission.id,
            milestone_id: submission.milestone_id,
            submitted_by: submission.submitted_by,
            file_url: submission.fileUrl,
            version_number: submission.version_number,
            timestamp: submission.timestamp,
            status: submission.status,
        }).returning();

        return new Submission(
            row.id,
            row.milestone_id ?? "",
            row.submitted_by ?? "",
            row.file_url,
            row.version_number,
            row.timestamp,
            row.status as SubmissionStatus,
        );
    }
}