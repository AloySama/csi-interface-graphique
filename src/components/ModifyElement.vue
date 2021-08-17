<template>
  <button class="hover-item" @click="setBool(true, false, false)">Modifier une société</button>
  <button class="hover-item" @click="setBool(false, true, false)">Modifier un établissement</button>
  <button class="hover-item" @click="setBool(false, false, true)">Modifier un restaurant</button>
  <div v-if="bool.ModifySociete">
    <ul>
      <li class="OneLine" v-for="(soc, index) in functions.ParseSociete(json)" :key="soc">
        <button :id="'ModifySoc' + index" class="hover-item" @click="waitForSociete(index); fillTab(index);">{{soc}}</button>
      </li>
    </ul>
  </div>
  <div v-if="bool.ModifyEtab">
    <ul>
      <li class="OneLine" v-for="(soc, index) in functions.ParseSociete(json)" :key="soc">
        <button class="hover-item" @click="tab.societe=index;">{{soc}}</button>
      </li>
    </ul>
  </div>
  <div v-if="tab.societe !== -1 && bool.ModifyEtab">
    <ul>
      <li class="OneLine" v-for="(etab, index_eta) in functions.ParseEtablissement(json, tab.societe)" :key="index_eta">
        <button class="hover-item" :id="'ModifyEta' + index_eta" @click="waitForEtab(index_eta)">{{etab}}</button>
      </li>
    </ul>
  </div>
  <div v-if="tab.societe !== -1 && bool.ModifySociete">
    <societe-form :json-file="json" :modify-content="json[tab.societe]" :id_societe="tab.societe" @to_complete="setCompleteSoc"></societe-form>
  </div>
  <div v-if="tab.etab !== -1 && bool.ModifyEtab">
    <etablissement-form :json-file="json" :etab-modify="returnEtab()" :id_societe="tab.societe" @to_complete="setCompleteEta"></etablissement-form>
  </div>
  <div v-if="bool.ModifyRest">
    <ul>
      <li class="OneLine" v-for="(soc, index) in functions.ParseSociete(json)" :key="soc">
        <button class="hover-item" @click="tab.societe=index;">{{soc}}</button>
      </li>
    </ul>
  </div>
  <div>
    <ul v-if="bool.ModifyRest && tab.societe !== -1">
      <li class="OneLine" v-for="(etab, index_eta) in functions.ParseEtablissement(json, tab.societe)" :key="index_eta">
        <button class="hover-item" :id="'ModifyEta' + index_eta" @click="tab.etab=index_eta">{{etab}}</button>
      </li>
    </ul>
  </div>
  <div>
    <ul v-if="bool.ModifyRest && tab.societe !== -1 && tab.etab !== -1">
      <li v-for="(rest, index) in functions.ParseRestaurant(json, tab.societe, tab.etab)" :key="rest">
        <button class="hover-item" :id="'ModifyRest' + index" @click="waitForRest(index)">{{rest}}</button>
      </li>
    </ul>
  </div>
  <div v-if="bool.ModifyRest && tab.societe !== -1 && tab.etab !== -1 && tab.rest !== -1">
    <restaurant-form :json-file="json" :rest-modify="json[tab.societe].etablissements[tab.etab].restaurants[tab.rest]" :id-tab="{soc: tab.societe, eta: tab.etab, rest: tab.rest}" @to_complete="setCompleteRes"></restaurant-form>
  </div>
</template>

<script>
import ParseEtablissement from "@/functions/ParseEtablissement";
import ParseSociete from "../functions/ParseSociete";
import ParseRestaurant from "@/functions/ParseRestaurant";
import SocieteForm from "@/components/SocieteForm";
import EtablissementForm from "@/components/EtablissementForm";
import RestaurantForm from "@/components/RestaurantForm";

export default {
  emits: ['complement'],
  components: {RestaurantForm, EtablissementForm, SocieteForm},
  props: {
    jsonFile: {
      required: true
    }
  },
  name: "ModifyElement",
  data() {
    return {
      json: this.jsonFile,
      bool: {
        ModifySociete: false,
        ModifyEtab: false,
        ModifyRest: false
      },
      tab: {
        societe: -1,
        etab: -1,
        rest: -1
      },
      functions: {
        ParseSociete,
        ParseEtablissement,
        ParseRestaurant
      },
      toComplete: {
        societe: {
          id: 0,
          code: '',
          TraiteurConfigs: []
        }
      }
    }
  },
  methods: {
    fillTab(index) {
      this.toComplete.societe.code = this.json[index].code;
      this.toComplete.societe.id = this.json[index].id;
      this.toComplete.societe.TraiteurConfigs = this.json[index].traiteursConfigs;
    },
    waitForSociete(index) {
      this.tab.societe = -1
      setTimeout(() => {this.tab.societe = index}, 0);
    },
    waitForEtab(index) {
      this.tab.etab = -1
      setTimeout(() => {this.tab.etab = index}, 0);
    },
    waitForRest(index) {
      this.tab.rest = -1
      setTimeout(() => {this.tab.rest = index}, 0);
    },
    setBool(soc, etab, rest) {
      this.bool.ModifySociete = soc;
      this.bool.ModifyEtab = etab;
      this.bool.ModifyRest = rest;
    },
    setCompleteSoc(complete) {
      this.json[this.tab.societe] = complete;
      setTimeout(() => {this.tab.societe = -1}, 0);
    },
    setCompleteEta(complete) {
      this.json[this.tab.societe].etablissements[this.tab.etab] = complete;
      setTimeout(() => {this.tab.etab = -1}, 0);
    },
    setCompleteRes(complete) {
      this.json[this.tab.societe].etablissements[this.tab.etab].restaurants[this.tab.rest] = complete;
      setTimeout(() => {this.tab.rest = -1}, 0);
    },
    returnEtab() {
      const value = this.json[this.tab.societe].etablissements[this.tab.etab];
      if (value == null) return []
      return value;
    },
    hasChanged(i) {
      return i !== this.tab.societe;
    }
  }
}
</script>
