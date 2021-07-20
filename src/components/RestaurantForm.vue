<!--  Dans la même logique que établissement : demander d'abord la société, puis l'établissement
      et ensuite ajouter le formulaire -->

<template>
 <div>
   {{json[0].etablissements[0].code}}
    Choisissez à quelle société vous voulez ajouter l'établissement. <br>
    <ul>
      <li class="OneLine" v-for="(soc, index) in ParseSociete(json)" :key="index">
        <button :id="'ButtonEta' + index" class="hover-item" @click="DisabledButton(index, true); HasChanged(index); FillSociete(index);">{{soc}}</button>
      </li>
      <button class="hover-item" @click="FillSociete(-1); App.methods.doEdit(false, false, 'AddRes'); $emit('edit_value', false)">Retour</button>
    </ul>
  </div>
  <div v-if="FillTab['societe'] >= 0">
    <ul>
      <li class="OneLine" v-for="(etab, index) in ParseRestaurant(json, FillTab['societe'])" :key="index">
        <button class="hover-item" @click="DisabledButton(index, true); FillEtab(index)" :id="'ButtonRes' + index">{{etab}}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import Etablissement from './EtablissementForm'
import App from "@/App";
import ParseSociete from "../functions/ParseSociete";
import ParseRestaurant from "@/functions/ParseRestaurant";

export default {
  name: "RestaurantForm",
  emits: ['edit_value'],
  data() {
    return {
      ParseSociete,
      ParseRestaurant,
      Etablissement,
      App,
      json: App.data().json,
      FillTab: {'societe': -1, 'etablissement': -1}
    }
  },
  methods: {
    FillSociete(societe) {
      this.FillTab['societe'] = societe;
    },
    FillEtab(etablissement) {
      this.FillTab['etablissement'] = etablissement;
      console.log(this.FillTab);
    },
    DisabledButton(i, bool) {
      document.getElementById("ButtonEta" + i).disabled = bool;
      for(let j = 0; j < ParseSociete(this.json).length; j++) {
        if (j === i) continue;
        document.getElementById('ButtonEta' + j).disabled = false;
      }
      console.log(this.FillTab)
    },
    HasChanged(index) {
      if (!(this.FillTab['societe'] === index))
        this.FillTab['etablissement'] = -1;
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