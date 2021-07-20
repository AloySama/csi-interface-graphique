export default function ParseRestaurant(json: any, societe: number) {
    const list = [];
    if (json.length === 0) return null;

    for (const index in json[societe].etablissements) {
        try {
            list.push(json[societe].etablissements[index].code)
        }
        catch (e) {
            console.error("Erreur : une erreur est survenue lors du parsing du Json.")
        }
    }
    return list;
}