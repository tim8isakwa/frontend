import { RegistrovaniKorisnik } from "./registrovaniKorisnik";
import { Zvanje } from "./zvanje";

export interface Nastavnik extends RegistrovaniKorisnik {
    jmbg: string,
    ime: string,
    biografija: string,
    zvanje: Zvanje
}