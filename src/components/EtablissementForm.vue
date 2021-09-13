<template>
  <div v-if="societe >= 0" class="container">
    <form @submit.prevent="">
      <div class="row">
        <div class="col-25">
          <label>Code</label>
        </div>
        <div class="col-75">
          <input type="text" required v-model="to_complete.code" maxlength="30">
          <p v-if="!CodeIsValid" class="error-message">Le code est requis</p>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>Id personnalisé ?</label>
        </div>
        <div class="col-75">
          <label class="checkbox-button">
            <input type="checkbox" class="checkbox-button__input" name="choice1" v-model="bool.add_id">
            <span class="checkbox-button__control"></span>
          </label>
        </div>
      </div>
      <div class="row" v-if="bool.add_id">
        <form @submit.prevent="">
          <div class="col-25">
            <label>id</label>
          </div>
          <div class="col-75">
            <input type="number" placeholder="id" v-model.number="to_complete.id" :min="0" :required="bool.add_id">
          </div>
        </form>
      </div>
      <div class="row">
        <div class="col-25"><label>Ajouter Traiteur config ?</label></div>
        <div class="col-75">
          <label class="checkbox-button">
            <input type="checkbox" class="checkbox-button__input" name="choice1" v-model="bool.add_tdd">
            <span class="checkbox-button__control"></span>
          </label>
        </div>
        <ListTraiteurConfig v-if="bool.add_tdd&&modify!=null" :traiteur-modification="to_complete.traiteursConfigs" @list-tdd="completeList"/>
        <tdd-form v-else-if="bool.add_tdd" @tdd_form="CompleteTDD"/>
      </div><input class="btn green" type="submit" :disabled="!to_complete.code||to_complete.id < 0" @click="IsSubmitted">
    </form>
  </div>
  <button v-if="id_societe!=null" class="btn yellow" @click="Reinitialize(json[id_societe].etablissements)">Réinitialiser les ID</button>
</template>

<script>
import ParseSociete from "../functions/ParseSociete";
import App from '../App'
import TddForm from "@/components/TddForm";
import {Reinitialize} from "@/functions/CheckID";
import {EditEtab} from "@/functions/EditElements";
import {FindAnID, isIDCorrect} from "@/functions/CheckID";
import {FindIDTC, checkIDTC} from "@/functions/CheckID";
import ListTraiteurConfig from "@/components/ListTraiteurConfig";

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
  components: {TddForm, ListTraiteurConfig},
  emits : ['edit_value', 'json_value', 'to_complete'],
  name: "EtablissementForm",
  data() {
    return {
      App,
      ParseSociete,
      Reinitialize,
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
      }
    }
  },
  methods: {
    CompleteTDD(tdd) {
      if (tdd.modify === false) {
        this.to_complete.traiteursConfigs = tdd.tdd;
      }
      else {
        for (const tddElement of tdd.tdd) {
          this.to_complete.traiteursConfigs.push(tddElement)
        }
      }
      if (checkIDTC(this.to_complete.traiteursConfigs)) this.to_complete.traiteursConfigs = FindIDTC(this.to_complete.traiteursConfigs);
      this.bool.add_tdd = false;
    },
    completeList(tab) {
      this.to_complete.traiteursConfigs[tab.index] = tab.tdd
    },
    disabledButton(i, bool, id) {
      this.societe = i;
      document.getElementById(id + i).disabled = bool;
      for(let j = 0; j < ParseSociete(this.json).length; j++) {
          if (j === i) continue;
          document.getElementById(id + j).disabled = false;
      }
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
      this.$emit('json_value', this.json);
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