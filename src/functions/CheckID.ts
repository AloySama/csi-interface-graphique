export function checkID(json: Record<string, any>, id: number) {
    // @ts-ignore
    for (const i of json) {
        if (i.id === id) return true
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
    for (const i of json[societe].etablissements) {
        if (i.id === id) return true
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

export function FindIDRes(json: Record<string, any>, bool: boolean, _id: number) {
    let id = 0;
    let True = true;
    while (True) {
        // @ts-ignore
        for (const i of json) {
            for (const j of i.etablissements) {
                for (const k of j.restaurants) {
                    if (bool && k.matricule === _id) return true;
                    else if (k.matricule === id) ++id;
                    else break
                }
            }
        }
        True = false;
    }
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

export function FindIDTC(TraiteurConfig: []) {
    return 0
}

export function checkIDTC(TraiteurConfig: []) {
    // vérifier simplement dans le TraiteurConfig si 2 fois le même id apparaît
    return 0
}