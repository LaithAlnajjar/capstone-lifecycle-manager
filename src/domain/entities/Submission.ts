export enum SubmissionStatus {
    UNDER_REVIEW = "under_review",
    NEEDS_REVISION = "needs_revision",
    APPROVED = "approved",
}

export interface Submission {
    id: string;
    milestone_id: string;
    submitted_by: string;
    file_url: string;
    version_number: number;
    timestamp: Date;
    status: SubmissionStatus;
    createdAt: Date;
    updatedAt: Date;
}
