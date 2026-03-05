export enum SubmissionStatus {
    PENDING = "pending",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
}


export class Submission {
    constructor(
        public readonly id:string,
        public readonly milestone_id:string,
        public readonly submitted_by:string,
        public readonly fileUrl:string,
        public readonly version_number:number,
        public readonly timestamp:Date,
        public readonly status:SubmissionStatus,
    ) {}
}
