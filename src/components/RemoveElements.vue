<template>
  <button class="hover-item" @click="RemoveSociete = !RemoveSociete; RemoveEtab = false; RemoveRest = false">Supprimez société</button>
  <button class="hover-item" @click="RemoveEtab = !RemoveEtab; RemoveSociete = false; RemoveRest =false">Supprimez établissement</button>
  <button class="hover-item" @click="RemoveRest = !RemoveRest; RemoveEtab = false; RemoveSociete = false">Supprimez restaurant</button>
  <div>
    <ul v-if="RemoveSociete || RemoveEtab || RemoveRest">
      <li class="OneLine" v-for="(soc, index) in ParseSociete(json)" :key="index">
        <button :id="'ButtonRem' + index" class="hover-item" @click="DisabledButton('ButtonRem', index, true); tab.societe = index">{{soc}}</button>
      </li>
      <button v-if="RemoveSociete && !RemoveEtab && !RemoveRest && this.json.length > 0" class="hover-item" @click="RemoveObjSociete" :disabled="tab.societe === -1">Valider</button>
    </ul>
  </div>
  <div>
    <ul v-if="(RemoveEtab || RemoveRest) && tab.societe !== -1">
      <li class="OneLine" v-for="(etab, index_eta) in ParseEtablissement(json, tab.societe)" :key="index_eta">
        <button class="hover-item" @click="tab.etab = index_eta; ">{{etab}}</button>
      </li>
      <button class="hover-item" @click="RemoveObjEtab" v-if="RemoveEtab && !RemoveRest" :disabled="tab.societe === -1 || tab.etab === -1">Valider</button>
    </ul>
  </div>
  <div>
    <ul v-if="RemoveRest && tab.societe !== -1 && tab.etab !== -1 && this.json[tab.societe].etablissements.length > 0">
      <li class="OneLine" v-for="(rest, index) in ParseRestaurant(json, tab.societe, tab.etab)" :key="index">
        <button class="hover-item" @click="tab.rest = index">{{rest}}</button>
      </li>
      <button class="hover-item" :disabled="tab.rest === -1" @click="RemoveObjRest">Valider</button>
    </ul>
  </div>
</template>

<script>
import ParseEtablissement from "@/functions/ParseEtablissement";
import ParseRestaurant from "@/functions/ParseRestaurant";
import ParseSociete from "../functions/ParseSociete";
import Restaurant from "@/components/RestaurantForm";

export default {
  props: {
    jsonFile: {
      required: true
    }
  },
  name: "RemoveElements",
  data() {
    return {
      tab: {societe: -1, etab: -1, rest: -1},
      json: this.jsonFile,
      ParseSociete,
      RemoveSociete: false,
      RemoveEtab: false,
      RemoveRest: false,
      DisabledButton: Restaurant.methods.DisabledButton,
      ParseEtablissement,
      ParseRestaurant
    }
  },
  methods: {
    RemoveObjSociete() {
      this.json.splice(this.tab.societe, 1);
      this.AllReset();
    },
    RemoveObjEtab() {
      this.json[this.tab.societe].etablissements.splice(this.tab.etab, 1);
      this.AllReset();
    },
    RemoveObjRest() {
      this.json[this.tab.societe].etablissements[this.tab.etab].restaurants.splice(this.tab.rest, 1);
      this.AllReset();
    },
    AllReset() {
      this.tab.societe = -1;
      this.tab.etab = -1;
      this.tab.rest = -1;
    }
  }
}
</script>