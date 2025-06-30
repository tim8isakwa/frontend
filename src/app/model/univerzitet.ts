import { Adresa } from "./adresa";
import { Fakultet } from "./fakultet";
import { Nastavnik } from "./nastavnik";

export interface Univerzitet {
    id?: number,
    naziv: string,
    datumOsnivanja: Date,
    opis: String,
    adresa: Adresa,
    rektor: Nastavnik,
    fakulteti: Fakultet[]
}