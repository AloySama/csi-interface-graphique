<!--  Dans la même logique que établissement : demander d'abord la société, puis l'établissement
      et ensuite ajouter le formulaire -->

<template>
 <div>
    Choisissez à quelle société vous voulez ajouter l'établissement. <br>
    <ul>
      <li class="OneLine" v-for="(soc, index_soc) in ParseSociete(json)" :key="index_soc">
        <button :id="'ButtonEta' + index_soc" class="hover-item" @click="DisabledButton('ButtonEta', index_soc, true); HasChanged(index_soc); FillSociete(index_soc); current = index_soc">{{soc}}</button>
      </li>
      <button class="hover-item" @click="FillSociete(-1); App.methods.doEdit(false, false, 'AddRes'); $emit('edit_value', false)">Retour</button>
    </ul>
  </div>
  <div v-if="FillTab['societe'] >= 0">
    <ul>
      <li class="OneLine" v-for="(etab, index_eta) in ParseRestaurant(json, FillTab['societe'])" :key="index_eta">
        <button class="hover-item" :id="'ButtonRes' + FillTab['societe'] + index_eta" @click="FillEtab(index_eta);">{{etab}}</button>
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
  props : {
    jsonFile: {
      default: null,
      required: true
    }
  },
  components: {TddForm},
  emits: ['edit_value'],
  data() {
    return {
      ParseSociete,
      ParseRestaurant,
      Etablissement,
      App,
      json: this.jsonFile,
      FillTab: {'societe': -1, 'etablissement': -1},
      AddMatricule: false,
      AddId: false,
      AddTdd: false,
      current: -1
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
    DisabledButton(ElementId, i, bool) {
      document.getElementById(ElementId + i).disabled = bool;
      for(let j = 0; j < this.CountSociete(); j++) {
        if (j === i) continue;
        try {
          document.getElementById(ElementId + j).disabled = !bool;
        }
        catch (e) {
          return;
        }
      }
    },
    DisabledButtonRes(IdButtonClicked) { //TODO: revoir cette fonction pour désactiver les boutons
      console.log('ButtonRes' + IdButtonClicked);
      document.getElementById('ButtonRes' + IdButtonClicked).disabled = true;
      for (let j  = 0; j < this.CountSociete; j++) {
        for (let i = 0; i < this.CountRes(j, i); i++) {
          document.getElementById('ButtonRes' + j + i).disabled = false;
        }
      }
    },
    HasChanged(index) {
      if (!(this.FillTab['societe'] === index))
        this.FillTab['etablissement'] = -1;
    },
    CountSociete() {
      return this.json.length
    },
    CountRes(soc, eta) {
      return this.json[soc].etablissements[eta].length;
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