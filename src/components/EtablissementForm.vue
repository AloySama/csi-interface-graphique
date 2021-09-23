<template>
  <div v-if="societe >= 0" class="container">
    <form @submit.prevent="">
      <input-form :type="'text'" v-slot="slotProp" :modify="to_complete.code">{{ attribution(slotProp.tab, 'code') }} Code</input-form>
      <input-checkbox v-slot="slotProp">{{ attrCheckbox(slotProp.bool, 'add_id') }} Ajouter un id ?</input-checkbox>
      <input-form v-if="bool.add_id" :type="'number'" v-slot="slotProp" :modify="to_complete.id">{{ attribution(slotProp.tab, 'id') }} id</input-form>
      <input-checkbox :modify="bool.add_tdd" v-slot="slotProp">{{ attrCheckbox(slotProp.bool, 'add_tdd') }} Ajouter TraiteurConfig</input-checkbox>
        <ListTraiteurConfig v-if="bool.add_tdd&&modify!=null" :traiteur-modification="to_complete.traiteursConfigs" @list-tdd="completeList"/>
        <tdd-form v-else-if="bool.add_tdd" @tdd_form="CompleteTDD"/>
      <input class="btn green" type="submit" :disabled="!to_complete.code || to_complete.id < 0" @click="IsSubmitted">
    </form>
  </div>
</template>

<script>
import ParseSociete from "../functions/ParseSociete";
import App from '../App'
import TddForm from "@/components/TddForm";
import {EditEtab} from "@/functions/EditElements";
import {FindAnID, isIDCorrect} from "@/functions/CheckID";
import {FindIDTC, checkIDTC} from "@/functions/CheckID";
import ListTraiteurConfig from "@/components/ListTraiteurConfig";
import InputForm from "@/components/FormSlots/InputForm";
import InputCheckbox from "@/components/FormSlots/InputCheckboxes";
import Societe from '@/components/SocieteForm';

export default {
  created() {
    this.isModifyContent();
  },
  props: {
    jsonFile: {
      default: null,
      required: true
    },
    etabModify: {
      default: null,
      required: false
    },
    id_societe: {
      default: null,
      required: true
    }
  },
  computed: {
    CodeIsValid() {
      return !!this.to_complete.code;
    }
  },
  components: {TddForm, ListTraiteurConfig, InputForm, InputCheckbox, Societe},
  emits : ['edit_value', 'json_value', 'to_complete'],
  name: "EtablissementForm",
  data() {
    return {
      App,
      ParseSociete,
      idSoc: this.id_societe,
      json: this.jsonFile,
      modify: this.etabModify,
      societe : this.id_societe,
      bool: {
        add_id: false,
        add_tdd: false,
      },
      to_complete: {
        id: null,
        code: '',
        traiteursConfigs: [],
        restaurants: []
      },
    }
  },
  methods: {
    attribution(value, to_complete) {
      this.to_complete[to_complete] = value;
      return null;
    },
    attrCheckbox(value, to_complete) {
      if (typeof value === 'function') return;
      this.bool[to_complete] = value;
      return null;
    },
    completeList(tab) {
      if (tab.modify) this.to_complete.traiteursConfigs[tab.index] = tab.tdd[0]
      else {
        for (const tdd of tab.tdd)
          this.to_complete.traiteursConfigs.push(tdd);
      }
      this.bool.add_tdd = false;
    },
    CompleteTDD(tdd) {
      if (tdd.modify === false) this.to_complete.traiteursConfigs = tdd.tdd;
      else {
        for (const tddElement of tdd.tdd) {
          this.to_complete.traiteursConfigs.push(tddElement)
        }
      }
      if (checkIDTC(this.to_complete.traiteursConfigs)) this.to_complete.traiteursConfigs = FindIDTC(this.to_complete.traiteursConfigs);
      this.bool.add_tdd = false;
    },
    IsSubmitted() {
      if (typeof this.to_complete.id === 'string') this.to_complete.id = null;
      if (this.modify != null) {
        this.bool.add_eta = false;
        this.bool.add_tdd = false;
        this.to_complete.id = this.to_complete.id !== null ? isIDCorrect(this.json[this.societe].etablissements, this.to_complete.id, this.to_complete.id) : FindAnID(this.json[this.societe].etablissements);
        this.$emit('to_complete', this.to_complete);
        return;
      }
      this.to_complete.id = this.to_complete.id !== null ? isIDCorrect(this.json[this.societe].etablissements, this.to_complete.id, -1) : FindAnID(this.json[this.societe].etablissements);
      const new_array = {
        id: this.to_complete.id,
        code: this.to_complete.code,
        traiteursConfigs: this.to_complete.traiteursConfigs,
        restaurants: this.to_complete.restaurants
      };
      this.json = EditEtab(this.json, new_array, this.societe);
      this.$emit('to_complete', false);
      this.AllNull();
    },
    AllNull() {
      this.to_complete.id = null;
      this.to_complete.code = null;
      this.to_complete.restaurants = [];
      this.to_complete.traiteursConfigs = [];
    },
    isModifyContent() {
      if (this.modify == null) return;
      this.societe = this.idSoc;
      if (this.modify.traiteursConfigs.length !== 0) this.bool.add_tdd = true;
      this.to_complete = {
        id: this.modify.id,
        code: this.modify.code,
        traiteursConfigs: this.modify.traiteursConfigs,
        restaurants: this.modify.restaurants
      }
    }
  }
}
</script>