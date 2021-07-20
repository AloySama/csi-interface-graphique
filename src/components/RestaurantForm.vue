<!--  Dans la même logique que établissement : demander d'abord la société, puis l'établissement
      et ensuite ajouter le formulaire -->

<template>
 <div>
    Choisissez à quelle société vous voulez ajouter l'établissement. <br>
    <ul>
      <li class="OneLine" v-for="(soc, index) in ParseSociete(json)" :key="index">
        <button :id="'ButtonEta' + index" class="hover-item" @click="DisabledButton('ButtonEta', index, true); HasChanged(index); FillSociete(index);">{{soc}}</button>
      </li>
      <button class="hover-item" @click="FillSociete(-1); App.methods.doEdit(false, false, 'AddRes'); $emit('edit_value', false)">Retour</button>
    </ul>
  </div>
  <div v-if="FillTab['societe'] >= 0">
    <ul>
      <li class="OneLine" v-for="(etab, index) in ParseRestaurant(json, FillTab['societe'])" :key="index">
        <button class="hover-item" :id="'ButtonRes' + FillTab['societe'] + index" @click="FillEtab(index); ">{{etab}}</button>
      </li>
    </ul>
  </div>
  <div v-if="FillTab['societe'] >= 0 && FillTab['etablissement'] >= 0">
    <strong>Attention : le matricule d'un restaurant est unique dans tout le fichier json</strong>
    <form>
      <label>Matricule personnalisé ?</label>
      <input v-model="AddMatricule" type="checkbox">
      <input v-if="AddMatricule" type="number" min="0">
      <label>RestaurantId personnalisé ?</label>
      <input v-model="AddId" type="checkbox">
      <input v-if="AddId" type="number">
      <label>Ajouter Traiteur Configs ?</label>
      <input v-model="AddTdd" type="checkbox">
      <tdd-form v-if="AddTdd"/>
    </form>
  </div>
</template>

<script>
import Etablissement from './EtablissementForm'
import App from "@/App";
import ParseSociete from "../functions/ParseSociete";
import ParseRestaurant from "@/functions/ParseRestaurant";
import TddForm from "@/components/TddForm";

export default {
  name: "RestaurantForm",
  components: {TddForm},
  emits: ['edit_value'],
  data() {
    return {
      ParseSociete,
      ParseRestaurant,
      Etablissement,
      App,
      json: App.data().json,
      FillTab: {'societe': -1, 'etablissement': -1},
      AddMatricule: false,
      AddId: false,
      AddTdd: false
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
    DisabledButton(ElementId, i,bool) {
      document.getElementById(ElementId + i).disabled = bool;
      for(let j = 0; j < ParseSociete(this.json).length; j++) {
        try {
          if (j === i) continue;                                            //TODO: Il faudrait vérifier en même temps l'id de l'établissement ET celui de la société pour skip
          document.getElementById(ElementId + j).disabled = false;
        }
        catch (e) {
          return;
        }
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

<!-- DisabledButton('ButtonRes' + FillTab['societe'], index,true) -->