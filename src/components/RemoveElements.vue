<template>
  <button class="hover-item" @click="setBool(!bool.RemoveSociete, false, false)">Supprimez société</button>
  <button class="hover-item" @click="setBool(false, !this.bool.RemoveEtab, false)">Supprimez établissement</button>
  <button class="hover-item" @click="setBool(false, false, !this.bool.RemoveRest)">Supprimez restaurant</button>
  <div>
    <ul v-if="bool.RemoveSociete || bool.RemoveEtab || bool.RemoveRest">
      <li class="OneLine" v-for="(soc, index) in ParseSociete(json)" :key="index">
        <button :id="'ButtonRem' + index" class="hover-item" @click="DisabledButton('ButtonRem' + index, 'delete', false); object.societe = index">{{soc}}</button>
      </li>
      <button v-if="bool.RemoveSociete && !bool.RemoveEtab && !bool.RemoveRest && this.json.length > 0" class="hover-item" @click="RemoveObjSociete" :disabled="object.societe === -1">Valider</button>
    </ul>
  </div>
  <div>
    <ul v-if="(bool.RemoveEtab || bool.RemoveRest) && object.societe !== -1">
      <li class="OneLine" v-for="(etab, index_eta) in ParseEtablissement(json, object.societe)" :key="index_eta">
        <button class="hover-item" @click="object.etab = index_eta; ">{{etab}}</button>
      </li>
      <button class="hover-item" @click="RemoveObjEtab" v-if="bool.RemoveEtab && !bool.RemoveRest" :disabled="object.societe === -1 || object.etab === -1">Valider</button>
    </ul>
  </div>
  <div>
    <ul v-if="bool.RemoveRest && object.societe !== -1 && object.etab !== -1 && this.json[object.societe].etablissements.length > 0">
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
      bool: {
        RemoveSociete: false,
        RemoveEtab: false,
        RemoveRest: false
      },
      tab: {delete: ""},
      DisabledButton: App.methods.disabledButtons,
      updateButtons: App.methods.updateButtons,
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
    },
    setBool(soc, etab, rest) {
      this.bool.RemoveSociete = soc;
      this.bool.RemoveEtab = etab;
      this.bool.RemoveRest = rest;
    }
  }
}
</script>