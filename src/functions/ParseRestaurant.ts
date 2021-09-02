export default function ParseRestaurant(json: JSON, societe: number, etab: number) {
    let i = 0;
    const list = [];
    // @ts-ignore
    for (const index of json[societe].etablissements[etab].restaurants) {
        try {
            //@ts-ignore
            list.push(index.matricule);
        }
        catch (e) {
            console.log(e)
            return;
        }
        i++;
    }
    return list;
}