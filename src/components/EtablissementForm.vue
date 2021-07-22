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
  <div v-if="FillTab >= 0">
    <form>
      <label>Id personnalisé ?</label>
      <input type="checkbox" v-model="add_id">
      <input v-if="add_id" placeholder="id">
      <label>Code</label>
      <input type="text" required>
      <label>Ajouter Traiteur config ?</label>
      <input v-model="add_tdd" type="checkbox">
      <tdd-form v-if="add_tdd"/>
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
      add_tdd: false
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
      console.log(this.FillTab)
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