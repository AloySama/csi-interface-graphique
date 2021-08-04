<template>
 <div>
   <div class="white"> Choisir société</div><br>
    <ul>
      <li class="OneLine" v-for="(soc, index_soc) in ParseSociete(json)" :key="index_soc">
        <button :id="'ButtonEta' + index_soc" class="hover-item" @click="DisabledButton('ButtonEta', index_soc, true); HasChanged(index_soc); FillSociete(index_soc)">{{soc}}</button>
      </li>
      <button class="hover-item" @click="FillSociete(-1); App.methods.doEdit(false, false, 'AddRes'); $emit('edit_value', false)">Retour</button>
    </ul>
  </div>
  <div v-if="FillTab['societe'] >= 0"> <div class="white">Choisir l'établissement</div>
    <ul>
      <li class="OneLine" v-for="(etab, index_eta) in ParseEtablissement(json, FillTab['societe'])" :key="index_eta">
        <button class="hover-item" :id="'ButtonRes' + FillTab['societe'] + index_eta" @click="FillEtab(index_eta);">{{etab}}</button>
      </li>
    </ul>
  </div>
  <div v-if="FillTab['societe'] >= 0 && FillTab['etablissement'] >= 0" class="container">
    <strong>Attention : le matricule d'un restaurant est unique dans tout le fichier json</strong>
    <form @submit.prevent="">
      <div class="row">
        <div class="col-25">
          <label>Code Restaurant</label>
        </div>
        <div class="col-75">
          <input type="text" required v-model="to_complete.etab_code">
          <p class="error-message" v-if="!to_complete.etab_code"> Le code de la société est requit</p>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
        <label>Matricule personnalisé ?</label>
        </div>
        <div class="col-75">
          <input v-model="AddMatricule" type="checkbox">
          <input v-if="AddMatricule" type="number" min="0" v-model.number="to_complete.matricule" required>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>Ajouter Traiteur Configs ?</label>
        </div>
        <div class="col-75">
          <input v-model="AddTdd" type="checkbox">
        </div>
        <tdd-form v-if="AddTdd" v-model="to_complete.traiteursConfigs" @tdd_form="CompleteTDD"/>
      </div>
    </form>
    <input class="hover-item" type="submit" @click="IsSubmitted" :disabled="!to_complete.etab_code">
  </div>
</template>

<script>
import Etablissement from './EtablissementForm'
import App from "@/App";
import ParseSociete from "../functions/ParseSociete";
import ParseEtablissement from "@/functions/ParseEtablissement";
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
      ParseEtablissement,
      Etablissement,
      App,
      json: this.jsonFile,
      FillTab: {'societe': -1, 'etablissement': -1},
      AddMatricule: false,
      AddId: false,
      AddTdd: false,
      old: null,
      to_complete: {
        "code_societe": '',
        "compteAuxiliaire": '',
        "etab_code": '',
        "reference_config_compensation": 0,
        "matricule": null,
        "restaurantId": null,
        "traiteursConfigs": []
      }
    }
  },
  methods: {
    CompleteTDD(tdd) {
      this.to_complete.traiteursConfigs.push(tdd);
    },
    setAuxiliaire(prefix, IDRes) {
      if (IDRes < 10)
        return prefix + '00' + IDRes;
      else if (IDRes < 100)
        return  prefix + '0' + IDRes;
      return prefix + IDRes;
    },
    FillSociete(societe) {
      this.FillTab['societe'] = societe;
    },
    FillEtab(etablissement) {
      this.FillTab['etablissement'] = etablissement;
      console.log(this.FillTab);
    },
    DisabledButton(ElementId, i, bool) {
      document.getElementById(ElementId + i).disabled = bool;
      for(let j = 0; j < this.json.length; j++) {
        if (j === i) continue;
        try {
          document.getElementById(ElementId + j).disabled = !bool;
        }
        catch (e) {
          console.log(e);
          return;
        }
      }
    },
    HasChanged(index) {
      if (!(this.FillTab['societe'] === index)) this.FillTab['etablissement'] = -1;
    },
    IsSubmitted() {
      const matricule = this.to_complete.matricule !==null?isIDCorrectRes(this.json, this.to_complete.matricule):FindIDRes(this.json, false, 0)
      const new_array = {
        matricule: matricule,
        auxiliaireCreditClient: this.setAuxiliaire('C950', matricule),
        restaurantId: matricule,
        traiteursConfigs: this.to_complete.traiteursConfigs,
        code_societe: this.to_complete.code_societe,
        compteAuxiliaire: this.setAuxiliaire('REST', matricule),
        etab_code: this.to_complete.etab_code,
        reference_config_compensation: this.to_complete.reference_config_compensation,
      };
      this.json = EditRestaurant(this.json, new_array, this.FillTab);
      this.AllNull()
    },
    AllNull() {
      this.to_complete.code_societe = '';
      this.to_complete.matricule = null;
      this.to_complete.compteAuxiliaire = '';
      this.to_complete.etab_code = ''
      this.to_complete.reference_config_compensation = null;
      this.to_complete.restaurantId = null;
    }

  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  display: inline;
}
</style>