export interface Project {
    id: string;
    group_id: string;
    supervisor_id: string;
    title: string;
    abstract: string;
    repository_url: string;
    final_grade: number | null;
    createdAt: Date;
    updatedAt: Date;
}
