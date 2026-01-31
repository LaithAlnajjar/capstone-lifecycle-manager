export enum BidStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
}

export interface SupervisorBid {
    id: string;
    group_id: string;
    supervisor_id: string;
    ranking: number;
    is_approved: boolean;
    status: BidStatus;
}