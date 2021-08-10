export default function ParseEtablissement(json: any, societe: number) {
    const list = [];
    if (json.length === 0) return null;

    for (const index of json[societe].etablissements) {
        try {
            list.push(index.code)
        }
        catch (e) {
            console.error("Erreur : une erreur est survenue lors du parsing du Json.")
        }
    }
    return list;
}