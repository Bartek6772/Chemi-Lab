const getStatisticFromString = (str) => {

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
    for (let i = 0; i < molElements.length; i++) {
        for (let j = 0; j < molElements.length; j++) {
            if (i == j) continue;
            if (molElements[j].name == molElements[i].name) {
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

const copyTab = (tab) => {
    return JSON.parse(JSON.stringify(tab));
}