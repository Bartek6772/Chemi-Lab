const btn = document.getElementById('btn');
const result = document.getElementById('result');
const moleculeBox = document.getElementById('molecule');

// ? other cant be 1,3,5...

btn.addEventListener('click', () => {
    if(moleculeBox.value == "") return;

    let molStr = moleculeBox.value;
    let tab = createTab(molStr);

    if(!isHydrocarbon(tab)) return;

    let group = getGroup(tab);
    console.log(group);

    if(group == -1) return;

    draw(tab,group);
})

const draw = (tab, group) => {
    result.innerHTML = null;

    let c = tab.find(el => el.name == "C").amount;
    let h = tab.find(el => el.name == "H").amount;

    let other = tab.find(el => (el.name != "C" && el.name != "H"));
    let pars = 0;

    if(other != null) {
        pars = other.amount / 2;
        other = other.name;
    }

    console.log(other);

    let x = 50, y = 70;

    if(group == 1){
        // ### alkan
        for (let i = 0; i < c; i++) {

            // ## for first
            if(i == 0){
                result.innerHTML += `<div style="top:${y}px;left:${x}px">${"H ---- "}</div>`;
                x += 45;
            }

            // ## for all
            result.innerHTML += `<div style="top:${y}px;left:${x}px">${"C ---- "}</div>`;

            if (pars > 0){
                result.innerHTML += `<div style="top:${y - 50}px;left:${x}px">${other}<br>|</div>`;
                result.innerHTML += `<div style="top:${y + 20}px;left:${x}px">|<br>${other}</div>`;
                pars--;
            }else{
                result.innerHTML += `<div style="top:${y - 50}px;left:${x}px">H<br>|</div>`;
                result.innerHTML += `<div style="top:${y + 20}px;left:${x}px">|<br>H</div>`;
            }

            x += 45;

            // ## for last
            if(i + 1 == c) {
                result.innerHTML += `<div style="top:${y}px;left:${x}px">${"H"}</div>`;
            }

        }
    }else if(group == 2){
        // ### alekn
        for (let i = 0; i < c; i++) {
            
            if(i==0){
                result.innerHTML += `<div style="top:${y}px;left:${x}px">C</div>`;
                result.innerHTML += `<div style="top:${y-2}px;left:${x+15}px">----</div>`;
                result.innerHTML += `<div style="top:${y+2}px;left:${x+15}px">----</div>`;
            }else{
                result.innerHTML += `<div style="top:${y}px;left:${x}px">${"C ---- "}</div>`;
            }

            if (pars > 0) {
                result.innerHTML += `<div style="top:${y - 50}px;left:${x}px">${other}<br>|</div>`;
                if (i != 1)
                result.innerHTML += `<div style="top:${y + 20}px;left:${x}px">|<br>${other}</div>`;
                pars--;
            } else {
                result.innerHTML += `<div style="top:${y - 50}px;left:${x}px">H<br>|</div>`;
                if (i != 1)
                result.innerHTML += `<div style="top:${y + 20}px;left:${x}px">|<br>H</div>`;
            }
            
            x += 45;

            if (i + 1 == c) {
                // for last
                result.innerHTML += `<div style="top:${y}px;left:${x}px">${"H"}</div>`;
            }
            
        }
    } else if (group == 3) {
        // TODO alkiny
    
    }
    
}

const createTab = (str) => {

    // ### createTab
    let wsp = 1;
    let molElements = [];
    for (let i = 0; i < str.length; i++) {
        let elName = str[i];
        let elAmount = 1;

        if (elName == "(") {
            for (let k = i; k < str.length; k++) {
                if (str[k] == ")") {
                    if (str[k + 1] != null) {
                        wsp = parseInt(str[k + 1]);
                        continue;
                    }
                }
            }
            continue;
        }

        if (elName == ")") {
            i++;
            wsp = 1;
            continue;
        }

        // Is double letter
        let isSmall = false;
        if (str[i + 1] != null) {
            if (str[i + 1] != "(" && str[i + 1] != ")" && isNaN(str[i + 1] * 1)) {
                var a = str[i + 1];
                var b = a.toLowerCase();

                isSmall = (a == b);
            }
        }

        // Element amount
        if (isSmall) {
            elName += str[i + 1];
            i++;
        }

        if (str[i + 1] != null) {
            if (!isNaN(str[i + 1] * 1)) {
                elAmount = parseInt(str[i + 1]);
                i++;
            }
        }


        let tmpL = {};

        tmpL.name = elName;
        tmpL.amount = elAmount * wsp;

        molElements.push(tmpL);
    }

    // ### remove duplicated elements
    for (let i = 0; i < molElements.length; i++){
        for (let j = 0; j < molElements.length; j++){
            if(i == j) continue;
            if(molElements[j].name == molElements[i].name){
                molElements[i].amount += molElements[j].amount;
                molElements.splice(j, 1);
                i--;
            }
        }
    }


    // ### sort
    molElements.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    })

    
    console.log(molElements);
    return molElements;
}

const getGroup = (tab) => {
    let amountC = 0, amountH = 0, amountOther = 0;
    for (let i = 0; i < tab.length; i++) {
        switch(tab[i].name){
            case "C":
                amountC += tab[i].amount;
                break;
            case "H":
                amountH += tab[i].amount;
                break;
            default:
                amountOther += tab[i].amount;
        }
    }

    if(2 * amountC + 2 == amountH + amountOther) {
        // Alkan
        return 1;
    }
    else if (2 * amountC == amountH + amountOther && amountC > 1){
        // Alken
        return 2;
    }
    else if (2 * amountC - 2 == amountH + amountOther && amountC > 1) {
        // Alkin
        return 3;
    }else{
        console.log("other");
        return -1;
    }
}

const isHydrocarbon = (tab) => {
    let hasH, hasC;
    for (let i = 0; i < tab.length; i++){
        if(tab[i].name == "C"){
            hasC = true;
        }
        else if(tab[i].name == "H"){
            hasH = true;
        }
    }

    console.log(tab.length);
    if(hasH && hasC && tab.length < 4) return true;
    return false;
}