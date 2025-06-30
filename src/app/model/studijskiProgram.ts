import { Fakultet } from "./fakultet";
import { Nastavnik } from "./nastavnik";

export interface StudijskiProgram {
    id?: number,
    naziv: String,
    opis: String,
    fakultet: Fakultet,
    rukovodilac: Nastavnik
}