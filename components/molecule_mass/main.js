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

        if (mol[i + 1] != null) {
            if (mol[i + 1] != ")" && mol[i + 1] != "(" && isNaN(mol[i + 1] * 1)) {
                var a = mol[i + 1];
                var b = a.toLowerCase();

                if(a==b){
                    el = mol[i] + mol[i + 1];
                    i++;
                }
            }
        }

        if (getNumber(mol[i + 1])) {
            num = parseInt(mol[i + 1]);
            i++;

            if (getNumber(mol[i + 1])) {
                num = num * 10 + parseInt(mol[i + 1]);
                i++;
            }
        }

        console.log(el, num);

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