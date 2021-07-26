// @ts-ignore
import editJson from 'edit-json-file'

export default function editSociete(json: Record<string, unknown>, to_add: JSON) {
    try {
        // @ts-ignore
        json.push(to_add)
        console.log(json)
    }
    catch (e) {
        console.error(e);
    }
    return json;
}