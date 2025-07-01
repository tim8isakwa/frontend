import { RegistrovaniKorisnik } from "./registrovaniKorisnik";
import { Adresa } from "./adresa";
import { StudentNaGodini } from "./studentNaGodini";
import { PohadjanjePredmeta } from "./pohadjanjePredmeta";
export interface Student extends RegistrovaniKorisnik {
    jmbg: string;
    ime: string;
    adresa: Adresa;
    studentNaGodinima?: StudentNaGodini[];
    pohadjanjePredmeta?: PohadjanjePredmeta[];
}
