<template>
  <div v-if="!modify">
    <div>
      <div class="white"> Choisir société</div>
      <br>
      <ul>
        <li class="OneLine" v-for="(soc, index_soc) in ParseSociete(json)" :key="index_soc">
          <button :id="'ButtonEta' + index_soc" class="hover-item"
                  @click="disabledButton('ButtonEta', index_soc, true); hasChanged(index_soc); fillSociete(index_soc)">
            {{ soc }}
          </button>
        </li>
        <button class="hover-item"
                @click="fillSociete(-1); App.methods.doEdit( false, ['AddRes']); $emit('edit_value', false)">Retour
        </button>
      </ul>
    </div>
    <div v-if="FillTab['societe'] >= 0">
      <div class="white">Choisir l'établissement</div>
      <ul>
        <li class="OneLine" v-for="(etab, index_eta) in ParseEtablissement(json, FillTab['societe'])" :key="index_eta">
          <button class="hover-item" :id="'ButtonRes' + FillTab['societe'] + index_eta" @click="fillEtab(index_eta);">
            {{ etab }}
          </button>
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    <button class="hover-item" @click="isModifyContent">modifier</button>
  </div>
  <div v-if="FillTab['societe'] >= 0 && FillTab['etablissement'] >= 0" class="container">
    <strong>Attention : le matricule d'un restaurant est unique dans tout le fichier json</strong>
    <form @submit.prevent="">
      <div class="row">
        <div class="col-25">
          <label>Etab code</label>
        </div>
        <div class="col-75">
          <input type="text" required v-model="to_complete[to_complete.length-1].etab_code">
          <p class="error-message" v-if="!to_complete[to_complete.length-1].etab_code"> Le code de la société est
            requit</p>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>code_societe</label>
        </div>
        <div class="col-75">
          <input type="text" v-model="to_complete[to_complete.length-1].code_societe">
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>Matricule personnalisé ?</label>
        </div>
        <div class="col-75">
          <input v-model="bool.AddMatricule" type="checkbox">
          <input v-if="bool.AddMatricule" type="number" min="0"
                 v-model.number="to_complete[to_complete.length-1].matricule" required>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>Ajouter Traiteur Configs ?</label>
        </div>
        <div class="col-75">
          <input v-model="bool.AddTdd" type="checkbox">
        </div>
        <tdd-form v-if="bool.AddTdd&&modify!=null"
                  :traiteur-modification="to_complete[to_complete.length-1].traiteursConfigs" @tdd_form="completeTDD"/>
        <tdd-form v-else-if="bool.AddTdd" @tdd_form="completeTDD"/>
      </div>
    </form>
    <input class="hover-item" type="submit" @click="isSubmitted"
           :disabled="!to_complete[to_complete.length-1].etab_code">
  </div>
  <button class="hover-item" @click="ReinitializeRes(json)">Reinitialise ID</button>
</template>

<script>
import {ReinitializeRes} from '@/functions/CheckID';
import Etablissement from './EtablissementForm'
import App from "@/App";
import ParseSociete from "../functions/ParseSociete";
import ParseEtablissement from "@/functions/ParseEtablissement";
import TddForm from "@/components/TddForm";
import {EditRestaurant} from "@/functions/EditElements";
import {FindIDRes, checkIDTC, isIDCorrectRes, FindIDTC} from "@/functions/CheckID";

export default {
  name: "RestaurantForm",
  props: {
    jsonFile: {
      default: null,
      required: true
    },
    restModify: {
      default: null,
      required: false
    },
    idTab: {
      default: {},
      required: false
    }
  },
  components: {TddForm},
  emits: ['edit_value', 'to_complete'],
  data() {
    return {
      ParseSociete,
      ParseEtablissement,
      ReinitializeRes,
      Etablissement,
      App,
      modify: this.restModify,
      ids: this.idTab,
      json: this.jsonFile,
      FillTab: {'societe': -1, 'etablissement': -1},
      bool: {
        AddMatricule: false,
        AddTdd: false
      },
      old: null,
      to_complete: [{
        code_societe: '',
        compteAuxiliaire: '',
        etab_code: '',
        reference_config_compensation: 0,
        auxiliaireCreditClient: '',
        matricule: null,
        restaurantId: null,
        traiteursConfigs: []
      }]
    }
  },
  methods: {
    addToComplete() {
      this.to_complete.push({
        code_societe: '',
        compteAuxiliaire: '',
        etab_code: '',
        reference_config_compensation: 0,
        auxiliaireCreditClient: '',
        matricule: null,
        restaurantId: null,
        traiteursConfigs: []
      })
    },
    completeTDD(tdd) {
      if (tdd.add) this.to_complete[this.to_complete.length - 1].traiteursConfigs = tdd.tdd;
      else for (const t of tdd.tdd) this.to_complete[this.to_complete.length - 1].traiteursConfigs.push(t);
      this.bool.AddTdd = false;
    },
    setAuxiliaire(prefix, IDRes) {
      if (IDRes < 10) return (prefix + '00' + IDRes);
      else if (IDRes < 100) return (prefix + '0' + IDRes);
      return (prefix + IDRes);
    },
    fillSociete(societe) {
      this.FillTab['societe'] = societe;
    },
    fillEtab(etablissement) {
      this.FillTab['etablissement'] = etablissement;
    },
    disabledButton(ElementId, i, bool) {
      document.getElementById(ElementId + i).disabled = bool;
      for (let j = 0; j < this.json.length; j++) {
        if (j === i) continue;
        try {
          document.getElementById(ElementId + j).disabled = !bool;
        } catch (e) {
          console.error(e);
          return;
        }
      }
    },
    hasChanged(index) {
      if ((this.FillTab['societe'] !== index)) this.FillTab['etablissement'] = -1;
    },
    isModifyContent() {
      this.FillTab.societe = this.ids.soc;
      this.FillTab.etablissement = this.ids.eta;
      if (typeof this.modify !== 'undefined') {
        this.to_complete.push({
          code_societe: this.modify.code_societe,
          compteAuxiliaire: this.modify.compteAuxiliaire,
          etab_code: this.modify.etab_code,
          reference_config_compensation: this.modify.reference_config_compensation,
          auxiliaireCreditClient: this.modify.auxiliaireCreditClient,
          matricule: this.modify.matricule,
          restaurantId: this.modify.restaurantId,
          traiteursConfigs: this.modify.traiteursConfigs
        })
      }
    },
    isSubmitted() {
      const length = this.to_complete.length - 1;
      if (typeof this.to_complete[length].matricule === 'string') this.to_complete[length].matricule = null;
      if (this.modify != null) {
        this.bool.AddTdd = false;
        this.to_complete[length].matricule = this.to_complete[length].matricule !== null ? isIDCorrectRes(this.json, this.to_complete[length].matricule, this.to_complete[length].matricule) :
            FindIDRes(this.json, false, 0, this.to_complete[length].matricule);
        this.$emit('to_complete', this.to_complete[length]);
        return;
      }
      this.to_complete[length].matricule = this.to_complete[length].matricule !== null ? isIDCorrectRes(this.json, this.to_complete[length].matricule,-1) :
          FindIDRes(this.json, false, 0,-1);
      this.to_complete[length].restaurantId = this.to_complete[length].matricule;
      this.to_complete[length].compteAuxiliaire = this.setAuxiliaire('REST', this.to_complete[length].matricule);
      this.to_complete[length].auxiliaireCreditClient = this.setAuxiliaire('C950', this.to_complete[length].matricule);
      this.to_complete[length].traiteursConfigs = checkIDTC(this.to_complete[length].traiteursConfigs) ?
          FindIDTC(this.to_complete[length].traiteursConfigs) : this.to_complete[length].traiteursConfigs;
      this.json = EditRestaurant(this.json, this.to_complete[length], this.FillTab);
      this.bool.AddTdd = false;
      this.addToComplete();
    }
  }
}
</script>