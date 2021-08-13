export function checkID(json: Record<string, any>, id: number) {
    // @ts-ignore
    for (const i of json) if (i.id === id) return true
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
    if (checkID(json, id) || id < 0) {
        alert('Problème sur l\'id, nombre automatique attribué')
        return FindAnID(json);
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
    for (let i = 0; i < TraiteurConfig.length; i++) {
        // @ts-ignore
        TraiteurConfig[i].id = i + 1;
    }
    return TraiteurConfig;
}

export function checkIDTC(TraiteurConfig: []) {
    const list: any[] = [];
    for (const t of TraiteurConfig) {
        // @ts-ignore
        if (list.includes(t.id)) {
            return true;
        }
        else {
            // @ts-ignore
            list.push(t.id)
        }
    }
    return false;
}