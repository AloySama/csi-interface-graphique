<!-- Afficher les différents sociétés pour que l'utilisateur choisisse puis faire le formulaire -->

<template>
  <div v-for="(soc, index) in ParseSociete(json)" :key="index">
    <button class="hover-item" @click="FillSociete(index)">{{soc}}</button>
  </div>
</template>

<script>
import ParseSociete from "../functions/ParseSociete";
const FillTab = {societe: 0}
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
    }
  }
}
</script>

<style scoped>

</style>