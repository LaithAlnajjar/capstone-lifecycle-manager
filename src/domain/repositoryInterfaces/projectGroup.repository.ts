import { ProjectGroup, SupervisorBid } from "@/domain/entities/index";

export interface IProjectGroupRepository {
    findById(id:string): Promise<ProjectGroup | null>;
    save(projectGroup: ProjectGroup): Promise<ProjectGroup>
}

export interface ISupervisorBidRepository {
    findById(id:string): Promise<SupervisorBid | null>;
    save(supervisorBid: SupervisorBid): Promise<SupervisorBid>
}