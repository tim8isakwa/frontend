import { StudijskiProgram } from "./studijskiProgram";
import { TimeTable } from "./timeTable";

export interface RasporedNastave {
    id?: number,
    program: string,
    godinaStudija: string,
    timeTable: TimeTable;
}