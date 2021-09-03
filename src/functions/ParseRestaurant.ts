export default function ParseRestaurant(json: JSON, societe: number, etab: number) {
    const list = [];
    // @ts-ignore
    for (const index of json[societe].etablissements[etab].restaurants) {
        list.push(index.restaurantId);
    }
    return list;
}