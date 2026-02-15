export enum BidStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
}

export class SupervisorBid {
    constructor(
        public readonly id: string,
        public readonly group_id: string,
        public readonly supervisor_id: string,
        public readonly ranking: number,
        public readonly isApproved: boolean,
        public readonly status: BidStatus,
        public readonly createdAt: Date,
    ) {}
}