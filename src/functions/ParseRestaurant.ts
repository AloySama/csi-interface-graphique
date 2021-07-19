export default function ParseRestaurant(json: any, societe: number, etablissement: number) {
    const list = [];
    if (json.length === 0) return null;

    try {    console.log(json[societe].etablissements[etablissement].restaurants[0])
    }
    catch (e) {
        console.error("Erreur : societe ou etablissement invalide. \n" + e)
    }
}