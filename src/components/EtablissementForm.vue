<template>
  <div v-if="!etabModify">
    <div class="white" v-if="modify==null"> Choisissez à quelle société vous voulez ajouter l'établissement.<br></div>
    <ul>
      <li class="OneLine" v-for="(soc, index) in ParseSociete(json)" :key="index">
        <button :id="'ButtonEta' + index" class="hover-item" @click="disabledButton(index, true, 'ButtonEta')">{{soc}}</button>
      </li>
        <button class="hover-item" @click="societe = -1; App.methods.doEdit(false, ['AddEta']); $emit('edit_value', false)">Retour</button>
    </ul>
  </div>
  <div v-else-if="modify.length!==0">
    <button class="hover-item" @click="isModifyContent">ok</button>
  </div>
  <div v-if="societe >= 0" class="container">
    <form @submit.prevent="">
      <div class="row">
        <div class="col-25">
          <label>Code</label>
        </div>
        <div class="col-75">
          <input type="text" required v-model="to_complete.code">
          <p v-if="!CodeIsValid" class="error-message">Le code est requit</p>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>Id personnalisé ?</label>
        </div>
        <div class="col-75">
          <input type="checkbox" v-model="bool.add_id">
          <input v-if="bool.add_id" type="number" placeholder="id" v-model.number="to_complete.id" :min="0" :required="bool.add_id">
        </div>
      </div>
      <div class="row">
        <div class="col-25"><label>Ajouter Traiteur config ?</label></div>
        <div class="col-75"><input v-model="bool.add_tdd" type="checkbox"></div>
        <tdd-form v-if="bool.add_tdd&&modify!=null" :traiteur-modification="to_complete.traiteursConfigs" @tdd_form="CompleteTDD"/>
        <tdd-form v-else-if="bool.add_tdd" @tdd_form="CompleteTDD"/>
      </div><input class="hover-item" type="submit" :disabled="!to_complete.code||to_complete.id < 0" @click="IsSubmitted">
    </form>
  </div>
  <button v-if="id_societe!=null" class="hover-item" @click="Reinitialize(json[id_societe].etablissements)">Réinitialise les ID</button>
</template>

<script>
/* eslint-disable */
import ParseSociete from "../functions/ParseSociete";
import App from '../App'
import TddForm from "@/components/TddForm";
import {Reinitialize} from "@/functions/CheckID";
import {EditEtab} from "@/functions/EditElements";
import {FindAnID, isIDCorrect} from "@/functions/CheckID";
import {FindIDTC, checkIDTC} from "@/functions/CheckID";

export default {
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
      required: false
    }
  },
  computed: {
    CodeIsValid() {
      return !!this.to_complete.code;
    }
  },
  components: {TddForm},
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
      societe : -1,
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
      if (checkIDTC(tdd)) tdd = FindIDTC(tdd)
      this.to_complete.traiteursConfigs = tdd;
      if (checkIDTC(this.to_complete.traiteursConfigs)) this.to_complete.traiteursConfigs = FindIDTC(this.to_complete.traiteursConfigs);
      this.bool.add_tdd = false;
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
        this.to_complete.id = this.to_complete.id !== null ? isIDCorrect(this.json[this.societe].etablissements, this.to_complete.id, this.to_complete.id) : FindAnID(this.json);
        this.$emit('to_complete', this.to_complete);
        return;
      }
      this.to_complete.id = this.to_complete.id !== null ? isIDCorrect(this.json[this.societe].etablissements, this.to_complete.id, -1) : FindAnID(this.json);
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
      this.societe = this.idSoc;
      if (typeof this.modify !== 'undefined') {
        if (this.modify.traiteursConfigs.length !== 0) this.bool.add_tdd = true;
        this.to_complete = {
          id: this.modify.id,
          code: this.modify.code,
          traiteursConfigs: this.modify.traiteursConfigs,
          restaurants: this.modify.restaurants
        };
      }
    }
  }
}
</script>

<style scoped>
.OneLine {
  display: inline;
}
</style>