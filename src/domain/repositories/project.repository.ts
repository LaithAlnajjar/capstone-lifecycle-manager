import {Project, Submission, Milestone} from "@/domain/entities/index"

export interface IProjectRepository {
    findById(id: string): Promise<Project | null>;
    save(project: Project): Promise<Project>
}

export interface ISubmissionRepository {
    findById(id:string): Promise<Submission | null>;
    save(submission: Submission): Promise<Submission>
}

export interface IMilestoneRepository {
    findById(id:string): Promise<Milestone | null>;
    save(milestone: Milestone): Promise<Milestone>
}