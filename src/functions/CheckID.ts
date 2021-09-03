export function checkID(json: Record<string, any>, id: number, except: number) {
    let once = 0;
    // @ts-ignore
    for (const i of json) {
        if (i.id === except && once === 0) {
            once++;
            continue;
        }
        if (i.id === id) return true
    }
    return false;
}

export function FindAnID(json: Record<string, unknown>) {
    let i = 0;

    while (checkID(json, i, -1)) i++;
    return i;
}

export function Reinitialize(json: Record<string, any>) {
    let i = 0;
    // @ts-ignore
    for (const soc of json) soc.id = i++;
}

export function isIDCorrect(json: Record<string, any>, id: number, except: number) {
    if (checkID(json, id, except) || id < 0) {
        alert('Problème sur l\'id, nombre automatique attribué')
        return FindAnID(json);
    }
    return id;
}

export function FindIDRes(json: Record<string, any>, bool: boolean, _id: number, except: number) {
    let id = 0;
    let last_id = 0;
    let once = 0;
    const True = true;
    // @ts-ignore
    while (True) {
        // @ts-ignore
        for (const societe of json) {
            for (const etablissement of societe.etablissements) {
                for (const restaurant of etablissement.restaurants) {
                    if (restaurant.matricule === except && once === 0) once++;
                    else if (bool && restaurant.matricule === _id) return true;
                    else if (restaurant.matricule === id) ++id;
                }
            }
        }
        if (last_id === id) break;
        else last_id = id;
    }
    if (bool) return false;
    return id;
}

export function ReinitializeRes(json: Record<string, any>) {
    let id = 0;
    // @ts-ignore
    for (const societe of json) {
        for (const etablissement of societe.etablissements) {
            for (const restaurant of etablissement.restaurants) {
                restaurant.matricule = id++;
            }
        }
    }
}

export function isIDCorrectRes(json: Record<string, any>, id: number, except: number) {
    // @ts-ignore
    if (FindIDRes(json, true, id, except) || id < 0) return FindIDRes(json, false, 0, -1);
    return id;
}

export function FindIDTC(TraiteurConfig: []) {
    // @ts-ignore
    for (let i = 0; i < TraiteurConfig.length; i++) TraiteurConfig[i].id = i;
    return TraiteurConfig;
}

export function checkIDTC(TraiteurConfig: []) {
    const list: any[] = [];
    for (const t of TraiteurConfig) {
        // @ts-ignore
        if (list.includes(t.id)) return true;
        // @ts-ignore
        else list.push(t.id)
    }
    return false;
}