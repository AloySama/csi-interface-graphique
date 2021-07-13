export default function json_list(json: Array<any>)
{
    let text = "<ol>"
    for (let j = 0; j < json.length; j++) {
        const ran =  json[j].etablissements[0].restaurants[0].traiteursConfigs[0];
        for (const i in ran) {
                text += '</li><ul>'
                text += i + ': <b>' + ran[i] + '</b> </ul>'
        }
        text += '</li><br>'
    }
    text += '</ol>'
    const pElement = document.createElement('div');
    pElement.innerHTML = text

    return pElement;
}
