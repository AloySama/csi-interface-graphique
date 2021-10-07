// @ts-ignore
import editJson from 'edit-json-file'

export default function EditSociete(json: Record<string, any>, to_add: JSON) {
    try {
        json.push(to_add)
    }
    catch (e) {
        console.error(e);
    }
    return json;
}

export function EditEtab(json: Record<string, any>, to_add: JSON, societe: number) {
    try {
        json[societe].etablissements.push(to_add)
    }
    catch (e) {
        console.error(e);
    }
    return json;
}

export function EditRestaurant(json: Record<string, any>, to_add: JSON, societe: Record<string, unknown>) {
    try {
        // @ts-ignore
        json[societe['societe']].etablissements[societe['etablissement']].restaurants.push(to_add);
    }
    catch (e) {
        console.error(e);
    }
    return json;
}