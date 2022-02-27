const btn = document.getElementById("btn");
const resultBox = document.getElementById("result");
const substratyBox = document.getElementById("substraty");
const produktyBox = document.getElementById("produkty");

let debug = false;

btn.addEventListener("click", () => {
    let substratyStr = substratyBox.value;
    let produktyStr = produktyBox.value;
    
    if(substratyStr == "" || produktyStr == "") return;
    //delete spaces!!!
    substratyStr = substratyStr.replaceAll(" ", "");
    produktyStr = produktyStr.replaceAll(" ", "");
    
    substratyStr = checkDoubleElements(substratyStr);
    produktyStr = checkDoubleElements(produktyStr);

    let substraty = createTab(substratyStr);
    let produkty = createTab(produktyStr);

    if(!checkCompatybility(substraty, produkty)){
        console.log("incorrect data");
        return;
    }

    calculate(substraty, produkty, 0);
})

const calculate = (substraty, produkty, control) => {
    control++;
    if(control >= 30){
        return;
    }

    let sub = copyTab(substraty);
    let pro = copyTab(produkty);

    if (debug){
        console.log(`calculate #${control}`);
        console.log(copyTab(sub), copyTab(pro));
    }
    

    let statsS = getStatistic(sub);
    let statsP = getStatistic(pro);

    if (debug) console.log(statsS, statsP);

    if(check(statsS, statsP)){
        if (debug){
            console.log("READY!");
            console.log(copyTab(sub), copyTab(pro));
        }
        
        substratyBox.value = tabToString(sub);
        produktyBox.value = tabToString(pro);

        resultBox.innerHTML = formatString(tabToString(sub)) + " = " + formatString(tabToString(pro));
    }

    for(let i = 0; i < statsS.length; i++){
        if(statsS[i].amount != statsP[i].amount){
            if (debug) console.log(`needed to increse ${statsS[i].name}`);
            if (statsS[i].amount > statsP[i].amount){
                // increse in product
                if (debug) console.log("incresing in products");

                let newTab = filterByElements(pro, statsS[i].name)
                console.log(newTab);

                for (let j = 0; j < newTab.length; j++) {
                    pro[newTab[j]].amount++;
                    calculate(sub, pro, control);
                }
            }else{
                // increse in substracts
                if (debug) console.log("incresing in substracts");

                let newTab = filterByElements(sub, statsS[i].name)
                console.log(newTab);

                for (let j = 0; j < newTab.length; j++) {
                    sub[newTab[j]].amount++;
                    calculate(sub, pro, control);
                }
            }
            break;
        }
    }

    console.log(`end #${control}`);
}


// Utils
const checkCompatybility = (substraty, produkty) => {
    let sub = copyTab(substraty);
    let pro = copyTab(produkty);
    console.log(sub, pro);

    let statsS = getStatistic(sub);
    let statsP = getStatistic(pro);
    console.log(statsS, statsP);


    if(statsS.length != statsP.length) return false;

    for (let i = 0; i < statsS.length; i++) {
        if(statsS[i].name != statsP[i].name) return false;
    }

    return true;
}

const createTab = (str) => {
    let mols = str.split("+");
    let tab = [];

    for(let i = 0; i < mols.length; i++){

        let molName = mols[i];
        let molAmount = 1;
        let molElements = [];
        
        let wsp = 1;
        for (let j = 0; j < molName.length; j++) {
            let elName = molName[j];
            let elAmount = 1;

            if(elName == "("){
                for(let k = i; k < molName.length; k++){
                    if(molName[k] == ")"){
                        if(molName[k+1] != null){
                            wsp = parseInt(molName[k+1]);
                            continue;
                        }
                    }
                }
                continue;
            }

            if(elName == ")"){
                j++;
                continue;
            }

            // Molecule amount
            if (j == 0 && !isNaN(elName * 1)){
                molAmount = elName;
                molName = molName.substring(1);
                j--;
                continue;
            }

            // Is double letter
            let isSmall = false;
            if(molName[j+1] != null){
                if(molName[j+1] != "(" && molName[j+1] != ")" && isNaN(molName[j + 1] * 1)){
                    var a = molName[j+1];
                    var b = a.toLowerCase();

                    isSmall = (a == b);
                }
            }

            // Element amount
            if(isSmall){
                elName += molName[j+1];
                j++;
            }

            if (molName[j + 1] != null) {
                if (!isNaN(molName[j + 1] * 1)) {
                    elAmount = parseInt(molName[j + 1]);
                    j++;
                }
            }
            

            let tmpL = {};
            
            tmpL.name = elName;
            tmpL.amount = elAmount * wsp;

            molElements.push(tmpL);
        }

        let tmpM = {};
        
        tmpM.name = molName;
        tmpM.amount = molAmount;
        tmpM.elements = molElements;


        tab.push(tmpM);
    }

    return tab;
}

const copyTab = (tab) => {
    return JSON.parse(JSON.stringify(tab));
}

const getStatistic = (tab) => {
    let stats = [];

    const getRowByName = (name) => {
        for (let k = 0; k < stats.length; k++) {
            if (stats[k].name === name)
                return k;
        }
        return -1;
    }

    for (let i = 0; i < tab.length; i++){
        for (let j = 0; j < tab[i].elements.length; j++){
            let obj = {};
            obj.name = tab[i].elements[j].name;

            let row = getRowByName(obj.name);
            if(row == -1){
                obj.amount = tab[i].elements[j].amount * tab[i].amount;
                stats.push(obj);
            }else{
                stats[row].amount += tab[i].elements[j].amount * tab[i].amount;
            }
        }
    }

    stats.sort((a,b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    })

    return stats;
}

// try by string
const filterByElements = (tab, element) => {
    let newTab = [];

    for (let i = 0; i < tab.length; i++) {
        for (let j = 0; j < tab[i].elements.length; j++) {
            console.log()
            if(tab[i].elements[j].name == element) {
                newTab.push(i);
            }            
        }
    }
    return [...newTab];
}

const check = (subStats, proStats) => {
    for (let i = 0; i < subStats.length; i++) {
        if(subStats[i].amount != proStats[i].amount) {
            return false;
        }
    }

    return true;
}

const checkDoubleElements = (str) => {
    const isDouble = (el) => {
        switch(el){
            case "H":
                return true;
            case "O":
                return true;
            case "N":
                return true;
            case "F":
                return true;
            case "P":
                return true;
            case "S":
                return true;
            case "Cl":
                return true;
            case "Se":
                return true;
            case "Br":
                return true;
            case "I":
                return true;
            default:
                return false;
        }
    }

    let tab = str.split('+');
    for (let i = 0; i < tab.length; i++) {
        if(!isNaN(tab[i][0] * 1)){
            if (isDouble(tab[i])){
                tab[i].splice(2, 0, "2")
            }
        }else{
            if (isDouble(tab[i])) {
                tab[i] = tab[i].splice(1, 0, "2")
            }
        } 
    }

    return tab.join("+");
}

String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

const tabToString = (tab) => {
    let str = "";
    for (let i = 0; i < tab.length; i++) {
        let amount = (tab[i].amount == 1 ? "" : tab[i].amount);
        if(i+1 == tab.length)
            str += amount + tab[i].name;
        else
            str += amount + tab[i].name + " + ";
    }
    return str;
}

const formatString = (str) => {
    let temp = str;
    let correct = 0;
    for (let i = 0; i < str.length; i++) {
        if(!isNaN(str[i] * 1)){
            let x = str[i];
            if(i == 0 || str[i-1] == "+" || str[i-1] == " "){
                temp = temp.splice(i + correct, 1, `<span>${x}</span>`);
                correct += 13;
                continue;
            }
            temp = temp.splice(i + correct,1, `<sub>${x}</sub>`);
            correct += 11;
        }
    }
    return temp;
}