export function checkID(json: Record<string, any>, id: number) {
    for (const i in json) {
        if (json[i].id === id) return true
    }
    return false;
}

export function FindAnID(json: Record<string, unknown>) {
    let i = 0;

    while (checkID(json, i)) i++;
    return i;
}

export function Reinitialize(json: Record<string, any>) {
    let i = 0;
    // @ts-ignore
    for (const soc of json) {
        if (typeof soc !== 'undefined')
            soc.id = i++;
    }
}

export function checkEtabID(json: Record<string, any>, societe: number ,id: number) {
    for (const i in json[societe].etablissements) {
        if (json[societe].etablissements[i].id === id) return true
    }
    return false;
}

export function isIDCorrect(json: Record<string, any>, id: number) {
    if (checkID(json, id)) {
        alert('L\'id existe déjà, nombre automatique attribué')
        return FindAnID(json)
    }
    return id;
}
//TODO: revoir cette fonction car problème d'id
export function FindIDRes(json: Record<string, any>, bool: boolean, _id: number) {
    let id = 0;
    // @ts-ignore
    for (let i of json) {
        for (let j of i.etablissements) {
            for (let k of j.restaurants) {
                if (bool && k.matricule === _id) return true;
                else if (k.matricule === id) {
                    ++id;
                    i = 0;
                    j = 0;
                    k = 0;
                }
            }
        }
    }
    if (bool) return false
    return id;
}

export function isIDCorrectRes(json: Record<string, any>, id: number) {
    // @ts-ignore
    if (FindIDRes(json, true, id)) {
        alert("L'id existe déjà, nombre automatique attribué")
        return FindIDRes(json, false, 0)
    }
    return id;
}