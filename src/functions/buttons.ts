function createButtons(json: Array<any>) {
    if (json == null) return ['ERREUR: le json ne peut être null'];
    const buttons: any[] = [];
    let TextButtons = "";

    for (let j = 0; j < json.length; j++) {
        if (!json[j]) continue;
        for (const i in json[j]) {
            buttons.push(i);
        }
        break
    }

    for (const i in buttons) {
        TextButtons += '<button class="hover-item">'
        TextButtons += buttons[i]
        TextButtons += '</button>'
    }
    TextButtons += '<button class="hover-item">Back</button>'
    return TextButtons;
}

module .exports = {
    createButtons
}