// @ts-ignore
import editJson from 'edit-json-file'

export default function editSociete(json: Record<string, unknown>, to_add: JSON) {
    try {
        // @ts-ignore
        json.push(to_add)
    }
    catch (e) {
        console.error(e);
    }
    return json;
}