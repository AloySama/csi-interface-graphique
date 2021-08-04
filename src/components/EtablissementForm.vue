<template>
  <div>
    <div class="white"> Choisissez à quelle société vous voulez ajouter l'établissement.<br></div>
    <ul>
      <li class="OneLine" v-for="(soc, index) in ParseSociete(json)" :key="index">
        <button :id="'ButtonEta' + index" class="hover-item" @click="DisabledButton(index, true, 'ButtonEta')">{{soc}}</button>
      </li>
        <button class="hover-item" @click="FillSociete(-1); App.methods.doEdit(false, false, 'AddEta'); $emit('edit_value', false)">Retour</button>
    </ul>
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
          <input type="checkbox" v-model="add_id">
          <input v-if="add_id" type="number" placeholder="id" v-model.number="to_complete.id" :min="0" :required="add_id">
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>Ajouter Traiteur config ?</label>
        </div>
        <div class="col-75">
          <input v-model="add_tdd" type="checkbox">
        </div>
        <tdd-form v-if="add_tdd" @tdd_form="CompleteTDD"/>
      </div>
      <input class="hover-item" type="submit" :disabled="!to_complete.code || to_complete.id < 0" @click="IsSubmitted">
    </form>
  </div>
</template>

<script>
import ParseSociete from "../functions/ParseSociete";
import App from '../App'
import TddForm from "@/components/TddForm";
import {EditEtab} from "@/functions/EditElements";
import {FindAnID, isIDCorrect} from "@/functions/CheckID";

export default {
  props: {
    jsonFile: {
      default: null,
      required: true
    }
  },
  computed: {
    CodeIsValid() {
      return !!this.to_complete.code;
    }
  },
  components: {TddForm},
  emits : ['edit_value', 'json_value'],
  name: "EtablissementForm",
  data() {
    return {
      App,
      ParseSociete,
      json: this.jsonFile,
      societe : -1,
      add_id: false,
      add_tdd: false,
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
      this.to_complete.traiteursConfigs = tdd;
    },
    FillSociete(s) {
      this.societe = s;
    },
    DisabledButton(i, bool, id) {
      this.FillSociete(i);
      document.getElementById(id + i).disabled = bool;
      for(let j = 0; j < ParseSociete(this.json).length; j++) {
          if (j === i) continue;
          document.getElementById(id + j).disabled = false;
      }
    },
    IsSubmitted() {
      const new_array = {
        id: this.to_complete.id!==null?this.to_complete.id<0?FindAnID(this.json[this.societe].etablissements):
            (isIDCorrect(this.json[this.societe].etablissements, this.to_complete.id)):FindAnID(this.json[this.societe].etablissements),
        code: this.to_complete.code,
        traiteursConfigs: this.to_complete.traiteursConfigs,
        restaurants: this.to_complete.restaurants
      };
      this.json = EditEtab(this.json, new_array, this.societe);
      this.$emit('json_value', this.json);
      this.AllNull();
    },
    AllNull() {
      this.to_complete.id = '';
      this.to_complete.code = null;
      this.to_complete.restaurants = [];
      this.to_complete.traiteursConfigs = [];
    }
  }
}
</script>

<style scoped>
.OneLine {
  display: inline;
}
</style>