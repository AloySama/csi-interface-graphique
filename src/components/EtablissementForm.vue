<template>
  <div>
    Choisissez à quelle société vous voulez ajouter l'établissement.<br>
    <ul>
      <li class="OneLine" v-for="(soc, index) in ParseSociete(json)" :key="index">
        <button :id="'ButtonEta' + index" class="hover-item" @click="DisabledButton(index, true)">{{soc}}</button>
      </li>
        <button class="hover-item" @click="FillSociete(-1); App.methods.doEdit(false, false, 'AddEta'); $emit('edit_value', false)">Retour</button>
    </ul>
  </div>
  <div v-if="FillTab >= 0" class="container">
    <form @submit.prevent="">
      <div class="row">
        <div class="col-25">
          <label>Id personnalisé ?</label>
        </div>
        <div class="col-75">
          <input type="checkbox" v-model="add_id">
          <input v-if="add_id" placeholder="id">
        </div>
      </div>
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
          <label>Ajouter Traiteur config ?</label>
        </div>
        <div class="col-75">
          <input v-model="add_tdd" type="checkbox">
        </div>
        <tdd-form v-if="add_tdd"/>
        <input type="submit">
      </div>
    </form>
  </div>
</template>

<script>
import ParseSociete from "../functions/ParseSociete";
import App from '../App'
import TddForm from "@/components/TddForm";

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
  emits : ['edit_value'],
  name: "EtablissementForm",
  data() {
    return {
      ParseSociete,
      json: this.jsonFile,
      App,
      FillTab : -1,
      add_id: false,
      add_tdd: false,
      to_complete: {
        id: null,
        code: '',
        traiteursConfigs: [],
        etablissements: []
      }
    }
  },
  methods: {
    FillSociete(s) {
      this.FillTab = s;
    },
    DisabledButton(i, bool) {
      this.FillSociete(i);
      document.getElementById("ButtonEta" + i).disabled = bool;
      for(let j = 0; j < ParseSociete(this.json).length; j++) {
          if (j === i) continue;
          document.getElementById('ButtonEta' + j).disabled = false;
      }
    }
  },
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