<template>
  <button class="hover-item" @click="RemoveSociete = !RemoveSociete; RemoveEtab = false; RemoveRest = false">Supprimez société</button>
  <button class="hover-item" @click="RemoveEtab = !RemoveEtab; RemoveSociete = false; RemoveRest =false">Supprimez établissement</button>
  <button class="hover-item" @click="RemoveRest = !RemoveRest; RemoveEtab = false; RemoveSociete = false">Supprimez restaurant</button>
  <div>
    <ul v-if="RemoveSociete || RemoveEtab || RemoveRest">
      <li class="OneLine" v-for="(soc, index) in ParseSociete(json)" :key="index">
        <button :id="'ButtonRem' + index" class="hover-item" @click="DisabledButton('ButtonRem', index, true); tab.societe = index">{{soc}}</button>
      </li>
      <button v-if="RemoveSociete && !RemoveEtab && !RemoveRest" class="hover-item" @click="RemoveObjSociete(tab.societe)">Valider</button>
    </ul>
  </div>
  <div>
    <ul v-if="(RemoveEtab || RemoveRest) && tab.societe !== -1">
      <li class="OneLine" v-for="(etab, index_eta) in ParseRestaurant(json, tab.societe)" :key="index_eta">
        <button class="hover-item" @click="tab.etab = index_eta">{{etab}}</button>
      </li>
    </ul>
    <button class="hover-item" @click="RemoveObjEtab(tab.etab)">Valider</button>
  </div>
  <div>
    <ul v-if="RemoveRest && tab.societe !== -1 && tab.etab !== -1">
      oui
    </ul>
  </div>
</template>

<script>
import ParseEtablissement from "@/functions/ParseEtablissement";
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
      ParseRestaurant: ParseEtablissement
    }
  },
  methods:{
    RemoveObjSociete(key) {
      this.json.splice(key, 1);
    },
    RemoveObjEtab(key) {
      this.json[this.tab.societe].etablissements.splice(key, 1);
    }
  }
}
</script>