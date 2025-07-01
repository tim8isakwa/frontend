import { RealizacijaPredmeta } from "./realizacijaPredmeta";
import { Student } from "./student";

export interface PohadjanjePredmeta {
    id: number;
    realizacijaPredmeta: RealizacijaPredmeta;
    student: Student;
}
