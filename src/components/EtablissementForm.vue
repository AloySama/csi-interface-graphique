<!-- Afficher les différents sociétés pour que l'utilisateur choisisse puis faire le formulaire -->

<template>
  <div v-for="(soc, index) in ParseSociete(json)" :key="index">
    <button :id="'ButtonEta' + index" class="hover-item" @click="FillSociete(index); DisabledButton(index, true)">{{soc}}</button>
  </div>
</template>

<script>
import ParseSociete from "../functions/ParseSociete";
const FillTab = {societe: -1}
export default {
  name: "EtablissementForm",
  data() {
    return {
      ParseSociete,
      json: require('../../../json_file/test_file.json')
    }
  },
  methods: {
    FillSociete(s) {
      FillTab['societe'] = s;
    },
    DisabledButton(i, bool) {
      document.getElementById("ButtonEta" + i).disabled = bool;
    }
  }
}
</script>

<style scoped>

</style>