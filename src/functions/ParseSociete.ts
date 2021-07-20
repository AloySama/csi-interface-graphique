export default function ParseSociete(json: any) {
    const list = [];
    if (typeof(json) === "undefined") {
        console.error("Json n'est pas défini : null retourné")
        return null;
    }
    if (json.length === 0) {
        return null;
    }
    for (const index in json) {
        try {
            list.push(json[index].code)
        }
        catch (e) {
            console.error(e)
            return null;
        }
    }
    return list;
}
