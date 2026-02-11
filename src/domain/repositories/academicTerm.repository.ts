import { AcademicTerm } from "@/domain/entities/index";

export interface IAcademicTermRepository {
    findById(id:string): Promise<AcademicTerm | null>;
    save(academicTerm: AcademicTerm): Promise<AcademicTerm>
}