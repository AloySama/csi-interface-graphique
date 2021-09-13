<template>
  <div v-if="FillTab['societe'] >= 0 && FillTab['etablissement'] >= 0" class="container">
    <strong>Attention : le matricule d'un restaurant est unique dans tout le fichier json</strong>
    <form @submit.prevent="">
      <div class="row" v-for="(value, key) of string" :key="value">
        <div class="col-25">
          <label>{{key}}</label>
        </div>
        <div class="col-75">
          <input type="text" v-model="to_complete[to_complete.length-1][value]" maxlength="30">
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>reference_config_compensation</label>
        </div>
        <div class="col-75">
          <input type="number" v-model.number="to_complete[to_complete.length-1].reference_config_compensation">
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>Matricule personnalisé ?</label>
        </div>
        <div class="col-75">
          <label class="checkbox-button">
            <input type="checkbox" class="checkbox-button__input" name="choice1" v-model="bool.AddMatricule">
            <span class="checkbox-button__control"></span>
          </label>
          <input v-if="bool.AddMatricule" type="number" min="0" v-model.number="to_complete[to_complete.length-1].matricule" required>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>Ajouter TraiteurConfigs ?</label>
        </div>
        <div class="col-75">
          <label class="checkbox-button">
            <input type="checkbox" class="checkbox-button__input" name="choice1" v-model="bool.AddTdd">
            <span class="checkbox-button__control"></span>
          </label>
        </div>
<!--        <tdd-form v-if="bool.AddTdd&&modify!=null"-->
<!--                  :traiteur-modification="to_complete[to_complete.length-1].traiteursConfigs" @tdd_form="completeTDD"/>-->
        <ListTraiteurConfig v-if="bool.AddTdd&&modify!=null" :traiteur-modification="to_complete.traiteursConfigs" @list-tdd="completeList"/>
        <tdd-form v-else-if="bool.AddTdd" @tdd_form="completeTDD"/>
      </div>
    </form>
    <input class="btn green" type="submit" @click="isSubmitted"
           :disabled="!to_complete[to_complete.length-1].etab_code">
  </div>
  <button class="btn yellow" @click="ReinitializeRes(json)">Reinitialiser ID</button>
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
import ListTraiteurConfig from "@/components/ListTraiteurConfig";

export default {
  created() {
    this.isModifyContent();
  },
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
      required: true
    }
  },
  components: {TddForm, ListTraiteurConfig},
  emits: ['edit_value', 'to_complete'],
  data() {
    return {
      ParseSociete,
      ParseEtablissement,
      ReinitializeRes,
      Etablissement,
      App,
      numberOfZeros: 3,
      modify: this.restModify,
      ids: this.idTab,
      json: this.jsonFile,
      FillTab: {'societe': this.idTab.soc, 'etablissement': this.idTab.eta},
      bool: {
        AddMatricule: false,
        AddTdd: false
      },
      to_complete: [{
        compteAuxiliaire: '',
        etab_code: '',
        reference_config_compensation: 0,
        auxiliaireCreditClient: '',
        matricule: null,
        restaurantId: null,
        traiteursConfigs: []
      }],
      string: {"Etab code": 'etab_code', "Code societe": 'code_societe'}
    }
  },
  methods: {
    addToComplete() {
      this.to_complete.push({
        compteAuxiliaire: '',
        etab_code: '',
        reference_config_compensation: 0,
        auxiliaireCreditClient: '',
        matricule: null,
        restaurantId: null,
        traiteursConfigs: []
      })
    },
    completeList(tab) {
      this.to_complete.traiteursConfigs[tab.index] = tab.tdd
    },
    completeTDD(tdd) {
      if (tdd.modify === false) {
        if (checkIDTC(tdd.tdd)) tdd.tdd = FindIDTC(tdd.tdd)
        this.to_complete[this.to_complete.length - 1].traiteursConfigs = tdd.tdd
      } else {
        for (const tddElement of tdd.tdd) {
          this.to_complete[this.to_complete.length - 1].traiteursConfigs.push(tddElement);
        }
      }
      if (checkIDTC(this.to_complete[this.to_complete.length - 1].traiteursConfigs)) this.to_complete[this.to_complete.length - 1].traiteursConfigs = FindIDTC(this.to_complete[this.to_complete.length - 1].traiteursConfigs);

      this.bool.AddTdd = false;
    },
    lengthNumber(number) {
      if (number === 1 || number === 0) return 1;
      let i = 0;

      for (; number > 1; i++) number /= 10;
      return i;
    },
    setAuxiliaire(prefix, IDRes) {
      const length = this.lengthNumber(IDRes);
      let text = prefix;

      for (let i = 0; i < (this.numberOfZeros - length); i++) text += '0'
      return text += IDRes;
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
    isModifyContent() {
      this.FillTab.societe = this.ids.soc;
      this.FillTab.etablissement = this.ids.eta;
      if (this.modify == null) return;
      this.to_complete.push({
        compteAuxiliaire: this.modify.compteAuxiliaire,
        etab_code: this.modify.etab_code,
        reference_config_compensation: this.modify.reference_config_compensation,
        auxiliaireCreditClient: this.modify.auxiliaireCreditClient,
        matricule: this.modify.matricule,
        restaurantId: this.modify.restaurantId,
        traiteursConfigs: this.modify.traiteursConfigs
      })
      if (this.modify.traiteursConfigs.length!==0) this.bool.AddTdd = true;
    },
    isSubmitted() {
      const length = this.to_complete.length - 1;
      if (typeof this.to_complete[length].matricule === 'string') this.to_complete[length].matricule = null;
      if (this.modify != null) {
        this.bool.AddTdd = false;
        this.to_complete[length].matricule = this.to_complete[length].matricule !== null ? isIDCorrectRes(this.json, this.to_complete[length].matricule, this.to_complete[length].matricule) :
            FindIDRes(this.json, false, 0, this.to_complete[length].matricule);
        this.to_complete[length].restaurantId = this.to_complete[length].matricule;
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