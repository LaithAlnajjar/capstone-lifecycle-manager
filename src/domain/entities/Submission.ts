export enum SubmissionStatus {
    UNDER_REVIEW = "under_review",
    NEEDS_REVISION = "needs_revision",
    APPROVED = "approved",
}


export class Submission {
    constructor(
        public readonly id:string,
        public readonly milestone_id:string,
        public readonly submitted_by:string,
        public readonly file_url:string,
        public readonly version_number:number,
        public readonly timestamp:Date,
        public readonly status:SubmissionStatus,
        public readonly createdAt:Date,
        public readonly updatedAt:Date,
    ) {}
}
