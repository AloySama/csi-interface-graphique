export default function ParseEtablissement(json: JSON) {
    const list = [];

    for (const index in json) {
        try {
            //@ts-ignore
            list.push(json[index].etablissements.code);
        }
        catch (e) {
            console.error(e)
            return;
        }
    }
    return list;
}