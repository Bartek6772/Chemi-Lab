const result = document.getElementsByClassName("result")[0];
const btn = document.getElementsByClassName("button")[0];
const molecule = document.getElementById("molecule");

btn.addEventListener("click", () => {
    let mol = molecule.value;

    if(mol == ""){
        result.textContent = "Nie wpisana wzoru cząsteczki!";
        return;
    }

    let mass = 0;
    let brackets = 1;
    for(let i = 0; i < mol.length; i++){
        let el = mol[i];
        let num = 1;

        if(el == "("){
            for(let j = i; j < mol.length; j++){
                if(mol[j] == ")"){
                    if(mol[j+1] == null) {
                        console.log("incorrect data");
                        return;
                    }
                    if(!getNumber(mol[j + 1])){
                        console.log("incorrect data");
                        return;
                    }
                    brackets = mol[j+1];
                }
            }
            continue;
        }

        if(el == ")"){
            brackets = 1;
            i++;
            continue;
        }

        console.log(el);

        let isSmall = false;
        if(mol[i+1] != null) {
            if(mol[i+1] != ")" && mol[i+1] != "("){
                var a = mol[i + 1];
                var b = a.toLowerCase();

                isSmall = a == b;
            }
        }

        if(getNumber(mol[i + 1])){
            num = mol[i + 1];
            i++;
        }
        else if (isSmall) {
            el = mol[i] + mol[i+1];
            i++;

            if (getNumber(mol[i + 1])) {
                num = mol[i + 1];
                i++;
            }
        }

        let x = data.find(e => e.symbol == el);
        if(x == null) {
            console.log("incorrect data");
            result.textContent = "Podany pierwiastek nie istnieje!";
            return;
        }
        mass += x.mass * num * brackets;

    }
    result.textContent = "Masa tej cząsteczki wynosi " + mass + "u";
})

const getNumber = (a) => {
    if (!isNaN(a * 1)) {
        return true;
    }
    return false;
}

const data = [
    { "symbol": "H", "mass": 1 },
    { "symbol": "Li", "mass": 7 },
    { "symbol": "Be", "mass": 9 },
    { "symbol": "Na", "mass": 23 },
    { "symbol": "Mg", "mass": 24 },
    { "symbol": "K", "mass": 39 },
    { "symbol": "Ca", "mass": 40 },
    { "symbol": "Sc", "mass": 45 },
    { "symbol": "Ti", "mass": 48 },
    { "symbol": "V", "mass": 51 },
    { "symbol": "Cr", "mass": 52 },
    { "symbol": "Mn", "mass": 55 },
    { "symbol": "Fe", "mass": 56 },
    { "symbol": "Co", "mass": 59 },
    { "symbol": "Ni", "mass": 59 },
    { "symbol": "Cu", "mass": 64 },
    { "symbol": "Zn", "mass": 65 },
    { "symbol": "He", "mass": 4 },
    { "symbol": "B", "mass": 11 },
    { "symbol": "C", "mass": 12 },
    { "symbol": "N", "mass": 14 },
    { "symbol": "O", "mass": 16 },
    { "symbol": "F", "mass": 19 },
    { "symbol": "Ne", "mass": 20 },
    { "symbol": "Al", "mass": 27 },
    { "symbol": "Si", "mass": 28 },
    { "symbol": "P", "mass": 31 },
    { "symbol": "S", "mass": 32 },
    { "symbol": "Cl", "mass": 34 },
    { "symbol": "Ar", "mass": 40 },
    { "symbol": "Ga", "mass": 70 },
    { "symbol": "Ge", "mass": 73 },
    { "symbol": "As", "mass": 75 },
    { "symbol": "Se", "mass": 79 },
    { "symbol": "Br", "mass": 80 },
    { "symbol": "Kr", "mass": 84 },
    { "symbol": "Hg", "mass": 201 },
    { "symbol": "Pb", "mass": 207 },
    { "symbol": "U", "mass": 238 },
    { "symbol": "Rb", "mass": 85 },
    { "symbol": "Sr", "mass": 88 },
    { "symbol": "Y", "mass": 89 },
    { "symbol": "Zr", "mass": 91 },
    { "symbol": "Nb", "mass": 93 },
    { "symbol": "Mo", "mass": 96 },
    { "symbol": "Tc", "mass": 98 },
    { "symbol": "Ru", "mass": 101 },
    { "symbol": "Rh", "mass": 103 },
    { "symbol": "Pd", "mass": 106 },
    { "symbol": "Ag", "mass": 108 },
    { "symbol": "Cd", "mass": 112 },
    { "symbol": "In", "mass": 115 },
    { "symbol": "Sn", "mass": 119 },
    { "symbol": "Sb", "mass": 122 },
    { "symbol": "Te", "mass": 128 },
    { "symbol": "I", "mass": 127 },
    { "symbol": "Xe", "mass": 131 },
    { "symbol": "Cs", "mass": 133 },
    { "symbol": "Ba", "mass": 137 },
    { "symbol": "La", "mass": 139 },
    { "symbol": "Hf", "mass": 178 },
    { "symbol": "Ta", "mass": 181 },
    { "symbol": "W", "mass": 184 },
    { "symbol": "Re", "mass": 186 },
    { "symbol": "Os", "mass": 190 },
    { "symbol": "Ir", "mass": 192 },
    { "symbol": "Pt", "mass": 195 },
    { "symbol": "Au", "mass": 197 },
    { "symbol": "Tl", "mass": 204 },
    { "symbol": "Bi", "mass": 209 },
    { "symbol": "Po", "mass": 209 },
    { "symbol": "At", "mass": 210 },
    { "symbol": "Rn", "mass": 222 },
    { "symbol": "Fr", "mass": 223 },
    { "symbol": "Ra", "mass": 226 },
    { "symbol": "Ac", "mass": 227 },
    { "symbol": "Rf", "mass": 261 },
    { "symbol": "Db", "mass": 263 },
    { "symbol": "Sg", "mass": 265 },
    { "symbol": "Bh", "mass": 264 },
    { "symbol": "Hs", "mass": 269 },
    { "symbol": "Mt", "mass": 268 },
    { "symbol": "Ds", "mass": 281 },
    { "symbol": "Rg", "mass": 280 },
    { "symbol": "Cn", "mass": 285 },
    { "symbol": "Nh", "mass": 284 },
    { "symbol": "Fl", "mass": 289 },
    { "symbol": "Mc", "mass": 288 },
    { "symbol": "Lv", "mass": 292 },
    { "symbol": "Ts", "mass": 294 },
    { "symbol": "Og", "mass": 294 },
    { "symbol": "Ce", "mass": 140 },
    { "symbol": "Pr", "mass": 141 },
    { "symbol": "Nd", "mass": 144 },
    { "symbol": "Pm", "mass": 145 },
    { "symbol": "Sm", "mass": 150 },
    { "symbol": "Eu", "mass": 152 },
    { "symbol": "Gd", "mass": 157 },
    { "symbol": "Tb", "mass": 159 },
    { "symbol": "Dy", "mass": 167 },
    { "symbol": "Ho", "mass": 165 },
    { "symbol": "Er", "mass": 167 },
    { "symbol": "Tm", "mass": 169 },
    { "symbol": "Yb", "mass": 173 },
    { "symbol": "Lu", "mass": 175 },
    { "symbol": "Th", "mass": 232 },
    { "symbol": "Pa", "mass": 231 },
    { "symbol": "Np", "mass": 237 },
    { "symbol": "Pu", "mass": 244 },
    { "symbol": "Am", "mass": 243 },
    { "symbol": "Cm", "mass": 247 },
    { "symbol": "Bk", "mass": 247 },
    { "symbol": "Cf", "mass": 251 },
    { "symbol": "Es", "mass": 252 },
    { "symbol": "Fm", "mass": 257 },
    { "symbol": "Md", "mass": 258 },
    { "symbol": "No", "mass": 259 },
    { "symbol": "Lr", "mass": 262 }
]