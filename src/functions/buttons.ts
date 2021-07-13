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
        TextButtons += '<button id="'+ buttons[i] +'" class="hover-item">'
        TextButtons += buttons[i]
        TextButtons += '</button>'
    }
    const bb =  document.querySelector('button');
    if (bb == null) return TextButtons;
    bb.disabled = true;
    return TextButtons;
}

module.exports = {
    createButtons
}