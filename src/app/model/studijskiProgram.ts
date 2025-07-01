import { Fakultet } from "./fakultet";
import { GodinaStudija } from "./godinaStudija";
import { Nastavnik } from "./nastavnik";

export interface StudijskiProgram {
    id?: number,
    naziv: String,
    opis: String,
    rukovodilac: Nastavnik,
    fakultet: Fakultet,
    godineStudija?: GodinaStudija[]
}