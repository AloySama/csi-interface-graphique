<template>
  <button class="hover-item" @click="setBool(true, false, false)">Modifier une société</button>
  <button class="hover-item" @click="setBool(false, true, false)">Modifier un établissement</button>
  <button class="hover-item" @click="setBool(false, false, true)">Modifier un restaurant</button>
  <div v-if="bool.ModifySociete">
    <ul>
      <li class="OneLine" v-for="(soc, index) in functions.ParseSociete(json)" :key="soc">
        <button :id="'ModifySoc' + index" class="hover-item" @click="waitFor(index); fillTab(index);">{{soc}}</button>
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
        <button class="hover-item" :id="'ModifyEta' + index_eta" @click="tab.etab=index_eta">{{etab}}</button>
      </li>
    </ul>
  </div>
  <div v-if="tab.societe !== -1 && bool.ModifySociete">
    <societe-form :json-file="json" :modify-content="json[tab.societe]" :id_societe="tab.societe"></societe-form>
  </div>
  <div v-if="tab.etab !== -1 && bool.ModifyEtab">
    <etablissement-form :json-file="json" :etab-modify="returnEtab()" :id_societe="tab.societe"></etablissement-form>
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
        <button class="hover-item" :id="'ModifyRest' + index">{{rest}}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import ParseEtablissement from "@/functions/ParseEtablissement";
import ParseSociete from "../functions/ParseSociete";
import ParseRestaurant from "@/functions/ParseRestaurant";
import SocieteForm from "@/components/SocieteForm";
import EtablissementForm from "@/components/EtablissementForm";

export default {
  emits: ['complement'],
  components: {EtablissementForm, SocieteForm},
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
    waitFor(index) {
      this.tab.societe = -1
      setTimeout(() => {this.tab.societe = index}, 0);
    },
    setBool(soc, etab, rest) {
      this.bool.ModifySociete = soc;
      this.bool.ModifyEtab = etab;
      this.bool.ModifyRest = rest;
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