import { Adresa } from "./adresa";
import { Nastavnik } from "./nastavnik";
import { StudijskiProgram } from "./studijskiProgram";
import { Univerzitet } from "./univerzitet";

export interface Fakultet {
    id?: number,
    naziv: string,
    opis: String,
    adresa: Adresa,
    dekan: Nastavnik,
    programi: StudijskiProgram[],
    univerzitet: Univerzitet
}