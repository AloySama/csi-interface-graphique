<!--  Dans la même logique que établissement : demander d'abord la société, puis l'établissement
      et ensuite ajouter le formulaire -->

<template>
 <div>
   <div class="white"> Choisissez à quelle société vous voulez ajouter l'établissement.</div><br>
    <ul>
      <li class="OneLine" v-for="(soc, index_soc) in ParseSociete(json)" :key="index_soc">
        <button :id="'ButtonEta' + index_soc" class="hover-item" @click="DisabledButton('ButtonEta', index_soc, true); HasChanged(index_soc); FillSociete(index_soc)">{{soc}}</button>
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
  <div v-if="FillTab['societe'] >= 0 && FillTab['etablissement'] >= 0" class="container">
    <strong>Attention : le matricule d'un restaurant est unique dans tout le fichier json</strong>
    <form @submit.prevent="">
      <div class="row">
        <div class="col-25">
        <label>Matricule personnalisé ?</label>
        </div>
        <div class="col-75">
          <input v-model="AddMatricule" type="checkbox">
          <input v-if="AddMatricule" type="number" min="0" v-model.number="to_complete.matricule">
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>RestaurantId personnalisé ?</label>
        </div>
        <div class="col-75">
          <input v-model="AddId" type="checkbox">
          <input v-if="AddId" type="number" v-model="to_complete.restaurantId">
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>Ajouter Traiteur Configs ?</label>
        </div>
        <div class="col-75">
          <input v-model="AddTdd" type="checkbox">
        </div>
        <tdd-form v-if="AddTdd" v-model="to_complete.traiteursConfigs"/>
      </div>
    </form>
    <input class="hover-item" type="submit" @click="IsSubmitted">
  </div>
</template>

<script>
import Etablissement from './EtablissementForm'
import App from "@/App";
import ParseSociete from "../functions/ParseSociete";
import ParseRestaurant from "@/functions/ParseRestaurant";
import TddForm from "@/components/TddForm";
import {EditRestaurant} from "@/functions/EditElements";
import {FindIDRes, isIDCorrectRes} from "@/functions/CheckID";

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
      old: null,
      to_complete: {
        "matricule": null,
        "restaurantId": null,
        "traiteursConfigs": []
      }
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
    DisabledButtonRes(IdSoc, IdRes) { //TODO: revoir cette fonction pour désactiver les boutons (il se passe des dingueries)
      const current = 'ButtonRes' + IdSoc + IdRes;
      console.log("CURRENT => " + current);
      if (this.old == null) {
        this.old = current;
        const doc = document.getElementById(this.old);
        if (doc == null) {
          console.error("doc est null.")
        }
        doc.disabled = true;
      }
      else {
        const doc_old = document.getElementById(this.old);
        this.old = current;
        const doc_current = document.getElementById(current);
        if (doc_old == null || doc_current == null) {
          console.error('l\'un des doc est null');
          this.FillTab['societe'] = -1;
          this.FillTab['etablissement'] = -1;
          return;
        }
        doc_old.disabled = false;
        doc_current.disabled = true;
      }
    },
    HasChanged(index) {
      if (!(this.FillTab['societe'] === index))
        this.FillTab['etablissement'] = -1;
    },
    CountSociete() {
      return this.json.length
    },
    IsSubmitted() {
      const new_array = {
        matricule: this.to_complete.matricule !==null?isIDCorrectRes(this.json, this.to_complete.matricule): FindIDRes(this.json),
        restaurantId: this.to_complete.restaurantId,
        traiteursConfigs: this.to_complete.traiteursConfigs};
      this.json = EditRestaurant(this.json, new_array, this.FillTab);
    },

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