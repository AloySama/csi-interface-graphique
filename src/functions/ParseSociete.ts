export default function ParseSociete(json: any) {
    const list = [];
    if (json.length === 0) {
        return null;
    }
    for (const societe in json) {
        try {
            list.push(json[societe].code)
        }
        catch (e) {
            console.error(e)
            return null;
        }
    }
    console.log(list)
    return list;
}
