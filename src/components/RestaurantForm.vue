<template>
  <div v-if="FillTab['societe'] >= 0 && FillTab['etablissement'] >= 0" class="container">
    <form @submit.prevent="">
      <div v-for="(value, key) of string" :key="value">
        <input-form :type="'text'" :modify="to_complete[to_complete.length-1][value]" v-slot="slotProp">{{attribution(slotProp.tab, value)}} {{key}}</input-form>
      </div>
      <input-form :type="'number'" :modify="to_complete[to_complete.length-1].reference_config_compensation" v-slot="slotProp">{{attribution(slotProp.tab, 'reference_config_compensation')}} reference_config_compensation</input-form>
      <input-checkbox v-slot="slotProp">{{attrCheckbox(slotProp.bool, 'add_matricule')}} Matricule ?</input-checkbox>
      <input-form v-if="bool.add_matricule" :type="'number'" v-slot="slotProp" :modify="to_complete[to_complete.length-1].matricule">{{ attribution(slotProp.tab, 'matricule')}} Matricule</input-form>
      <input-checkbox :modify="bool.add_tdd" v-slot="slotProp">{{attrCheckbox(slotProp.bool, 'add_tdd')}} Ajouter TraiteurConfig ?</input-checkbox>
        <ListTraiteurConfig v-if="bool.add_tdd&&modify!=null" :traiteur-modification="to_complete[1].traiteursConfigs" @list-tdd="completeList"/>
        <tdd-form v-else-if="bool.add_tdd" @tdd_form="completeTDD"/>
    </form>
    <input class="btn green" type="submit" @click="isSubmitted"
           :disabled="!to_complete[to_complete.length-1].etab_code">
  </div>
</template>

<script>
import Etablissement from './EtablissementForm';
import App from "@/App";
import ParseSociete from "../functions/ParseSociete";
import ParseEtablissement from "@/functions/ParseEtablissement";
import TddForm from "@/components/TddForm";
import {EditRestaurant} from "@/functions/EditElements";
import {FindIDRes, checkIDTC, isIDCorrectRes, FindIDTC} from "@/functions/CheckID";
import ListTraiteurConfig from "@/components/ListTraiteurConfig";
import InputForm from "@/components/FormSlots/InputForm";
import InputCheckbox from "@/components/FormSlots/InputCheckboxes";

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
  components: {TddForm, ListTraiteurConfig, InputForm, InputCheckbox},
  emits: ['edit_value', 'to_complete'],
  data() {
    return {
      ParseSociete,
      ParseEtablissement,
      Etablissement,
      App,
      numberOfZeros: 3,
      modify: this.restModify,
      ids: this.idTab,
      json: this.jsonFile,
      FillTab: {'societe': this.idTab.soc, 'etablissement': this.idTab.eta},
      bool: {
        add_matricule: false,
        add_tdd: false
      },
      to_complete: [{
        compteAuxiliaire: '',
        etab_code: '',
        code_societe: '',
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
    attribution(value, to_complete) {
      this.to_complete[this.to_complete.length-1][to_complete] = value;
      return null;
    },
    attrCheckbox(value, to_complete) {
      if (typeof value === 'function') return;
      this.bool[to_complete] = value;
      return null;
    },
    completeList(tab) {
      if (tab.modify) this.to_complete[1].traiteursConfigs[tab.index] = tab.tdd[0];
      else {
        for (const tdd of tab.tdd)
          this.to_complete[1].traiteursConfigs.push(tdd);
      }
    },
    completeTDD(tdd) {
      if (tdd.modify === false) {
        if (checkIDTC(tdd.tdd)) tdd.tdd = FindIDTC(tdd.tdd)
        this.to_complete[this.to_complete.length - 1].traiteursConfigs = tdd.tdd;
        this.bool.add_tdd = false;
      } else {
        for (const tddElement of tdd.tdd) {
          this.to_complete[this.to_complete.length - 1].traiteursConfigs.push(tddElement);
        }
      }
      if (checkIDTC(this.to_complete[this.to_complete.length - 1].traiteursConfigs)) this.to_complete[this.to_complete.length - 1].traiteursConfigs = FindIDTC(this.to_complete[this.to_complete.length - 1].traiteursConfigs);
      this.bool.add_tdd = false;
    },
    lengthNumber(number) {
      if (number >= 0 && number <= 9) return 1;
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
    isModifyContent() {
      this.FillTab.societe = this.ids.soc;
      this.FillTab.etablissement = this.ids.eta;
      if (this.modify == null) return;
      this.to_complete.push({
        compteAuxiliaire: this.modify.compteAuxiliaire,
        etab_code: this.modify.etab_code,
        code_societe: this.modify.code_societe,
        reference_config_compensation: this.modify.reference_config_compensation,
        auxiliaireCreditClient: this.modify.auxiliaireCreditClient,
        matricule: this.modify.matricule,
        restaurantId: this.modify.restaurantId,
        traiteursConfigs: this.modify.traiteursConfigs
      })
      if (this.modify.traiteursConfigs.length!==0) this.bool.add_tdd = true;
    },
    isSubmitted() {
      const length = this.to_complete.length - 1;
      if (typeof this.to_complete[length].matricule === 'string') this.to_complete[length].matricule = null;
      this.to_complete[length].compteAuxiliaire = this.setAuxiliaire('REST', this.to_complete[length].matricule);
      this.to_complete[length].auxiliaireCreditClient = this.setAuxiliaire('C950', this.to_complete[length].matricule);
      if (this.modify != null) {
        this.bool.add_tdd = false;
        this.to_complete[length].matricule = this.to_complete[length].matricule !== null ? isIDCorrectRes(this.json, this.to_complete[length].matricule, this.to_complete[length].matricule) :
            FindIDRes(this.json, false, 0, this.to_complete[length].matricule);
        this.to_complete[length].restaurantId = this.to_complete[length].matricule;
        this.$emit('to_complete', this.to_complete[length]);
        return;
      }
      this.to_complete[length].matricule = this.to_complete[length].matricule !== null ? isIDCorrectRes(this.json, this.to_complete[length].matricule, -1) :
          FindIDRes(this.json, false, 0, -1);
      this.to_complete[length].restaurantId = this.to_complete[length].matricule;
      this.to_complete[length].traiteursConfigs = checkIDTC(this.to_complete[length].traiteursConfigs) ?
          FindIDTC(this.to_complete[length].traiteursConfigs) : this.to_complete[length].traiteursConfigs;
      this.json = EditRestaurant(this.json, this.to_complete[length], this.FillTab);
      this.bool.add_tdd = false;
      this.$emit('to_complete', false);
    }
  }
}
</script>