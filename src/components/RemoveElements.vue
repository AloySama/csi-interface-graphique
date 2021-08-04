<template>
  <button class="hover-item" @click="RemoveSociete = !RemoveSociete; RemoveEtab = false; RemoveRest = false">Supprimez société</button>
  <button class="hover-item" @click="RemoveEtab = !RemoveEtab; RemoveSociete = false; RemoveRest =false">Supprimez établissement</button>
  <button class="hover-item" @click="RemoveRest = !RemoveRest; RemoveEtab = false; RemoveSociete = false">Supprimez restaurant</button>
  <div>
    <ul v-if="RemoveSociete || RemoveEtab || RemoveRest">
      <li class="OneLine" v-for="(soc, index) in ParseSociete(json)" :key="index">
        <button :id="'ButtonRem' + index" class="hover-item" @click="DisabledButton('ButtonRem' + index, 'delete', false); object.societe = index">{{soc}}</button>
      </li>
      <button v-if="RemoveSociete && !RemoveEtab && !RemoveRest && this.json.length > 0" class="hover-item" @click="RemoveObjSociete" :disabled="object.societe === -1">Valider</button>
    </ul>
  </div>
  <div>
    <ul v-if="(RemoveEtab || RemoveRest) && object.societe !== -1">
      <li class="OneLine" v-for="(etab, index_eta) in ParseEtablissement(json, object.societe)" :key="index_eta">
        <button class="hover-item" @click="object.etab = index_eta; ">{{etab}}</button>
      </li>
      <button class="hover-item" @click="RemoveObjEtab" v-if="RemoveEtab && !RemoveRest" :disabled="object.societe === -1 || object.etab === -1">Valider</button>
    </ul>
  </div>
  <div>
    <ul v-if="RemoveRest && object.societe !== -1 && object.etab !== -1 && this.json[object.societe].etablissements.length > 0">
      <li class="OneLine" v-for="(rest, index) in ParseRestaurant(json, object.societe, object.etab)" :key="index">
        <button class="hover-item" @click="object.rest = index">{{rest}}</button>
      </li>
      <button class="hover-item" :disabled="object.rest === -1" @click="RemoveObjRest">Valider</button>
    </ul>
  </div>
</template>

<script>
import ParseEtablissement from "@/functions/ParseEtablissement";
import ParseRestaurant from "@/functions/ParseRestaurant";
import ParseSociete from "../functions/ParseSociete";
import App from "@/App";

export default {
  props: {
    jsonFile: {
      required: true
    }
  },
  name: "RemoveElements",
  data() {
    return {
      object: {societe: -1, etab: -1, rest: -1},
      json: this.jsonFile,
      ParseSociete,
      RemoveSociete: false,
      RemoveEtab: false,
      RemoveRest: false,
      tab: {delete: ""},
      DisabledButton: App.methods.DisabledButtons,
      UpdateButtons: App.methods.UpdateButtons,
      ParseEtablissement,
      ParseRestaurant
    }
  },
  methods: {
    RemoveObjSociete() {
      this.json.splice(this.object.societe, 1);
      this.AllReset();
    },
    RemoveObjEtab() {
      this.json[this.object.societe].etablissements.splice(this.object.etab, 1);
      this.AllReset();
    },
    RemoveObjRest() {
      this.json[this.object.societe].etablissements[this.object.etab].restaurants.splice(this.object.rest, 1);
      this.AllReset();
    },
    AllReset() {
      this.object.societe = -1;
      this.object.etab = -1;
      this.object.rest = -1;
    }
  }
}
</script>