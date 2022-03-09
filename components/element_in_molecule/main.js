const form = document.getElementById('form');
const result = document.getElementById('result');
const molecule = document.getElementById('molecule');
const element = document.getElementById('element');
const btn = document.getElementById('btn');

btn.addEventListener('click', (event) => {

    let val = document.querySelector('input[name="dataType"]:checked').value;

    if (molecule.value == "") {
        result.textContent = "Nie wpisana wzoru cząsteczki!";
        return;
    }

    let data = calculate(molecule.value, element.value)
    if(data == null){
        return;
    }

    if(val == "mass"){
        result.innerText = `Zawartość tego pierwiastka wynosi ${data.elMass}/${data.molMass}`;
    }
    else if(val == "percentage"){
        let x = data.elMass / data.molMass * 100;
        result.innerText = "Zawartość tego pierwiastka wynosi " + Math.round(x) + "%";
    }
    
    // event.preventDefault();
})

const calculate = (mol, element) => {
    
    let obj = {};

    let elMass = 0;
    let mass = 0;
    let brackets = 1;

    for (let i = 0; i < mol.length; i++) {
        let el = mol[i];
        let num = 1;

        if (el == "(") {
            for (let j = i; j < mol.length; j++) {
                if (mol[j] == ")") {
                    if (mol[j + 1] == null) {
                        console.log("incorrect data");
                        return;
                    }
                    if (isNaN(mol[j + 1] * 1)) {
                        console.log("incorrect data");
                        return;
                    }
                    brackets = mol[j + 1];
                }
            }
            continue;
        }

        if (el == ")") {
            brackets = 1;
            i++;
            continue;
        }

        if (mol[i + 1] != null) {
            if (mol[i + 1] != ")" && mol[i + 1] != "(" && isNaN(mol[i + 1] * 1)) {
                var a = mol[i + 1];
                var b = a.toLowerCase();

                if(a == b){
                    el = mol[i] + mol[i + 1];
                    i++;
                }
            }
        }

        if (!isNaN(mol[i + 1] * 1)) {
            num = parseInt(mol[i + 1]);
            i++;

            if (!isNaN(mol[i + 1] * 1)) {
                num = num * 10 + parseInt(mol[i + 1]);
                i++;
            }
        }

        let x = data.find(e => e.symbol == el);
        if (x == null) {
            console.log("incorrect data");
            result.textContent = "Podany pierwiastek nie istnieje!";
            return;
        }

        if(el == element){
            elMass += x.mass * num * brackets;
        }
        mass += x.mass * num * brackets;

    }

    obj.molMass = mass;
    obj.elMass = elMass;
    return obj;
}