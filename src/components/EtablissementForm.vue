<!-- Afficher les différents sociétés pour que l'utilisateur choisisse puis faire le formulaire -->

<template>
  <div>
    Choisissez à quelle société vous voulez ajouter l'établissement. <br>
    <ul>
      <li class="OneLine" v-for="(soc, index) in ParseSociete(json)" :key="index">
        <button :id="'ButtonEta' + index" class="hover-item" @click="DisabledButton(index, true)">{{soc}}</button>
      </li>
      <li><br>
        <button class="hover-item" @click="FillSociete(-1); App.methods.doEdit(false, false, 'AddEta'); App.data(undefined).edit_eta = true">Retour {{App.data(undefined).edit_eta}}</button>
      </li>
    </ul>
  </div>
</template>
<!--TODO: Fixer le bouton retour qui ne fonctionne pas comme prévu -->
<script>

import ParseSociete from "../functions/ParseSociete";
import App from '../App'
const FillTab = {societe: -1}
export default {
  name: "EtablissementForm",
  data() {
    return {
      ParseSociete,
      json: require('../../../json_file/test_file.json'),
      App
    }
  },
  methods: {
    FillSociete(s) {
      FillTab['societe'] = s;
    },
    DisabledButton(i, bool) {
      this.FillSociete(i);
      document.getElementById("ButtonEta" + i).disabled = bool;
      for(let j = 0; j < ParseSociete(this.json).length; j++) {
          if (j === i) continue;
          document.getElementById('ButtonEta' + j).disabled = false;
      }
      console.log(FillTab)
    }
  }
}
</script>

<style scoped>
.OneLine {
  display: inline;
}
ul {
  list-style-type: none;
  display: inline;
}
</style>