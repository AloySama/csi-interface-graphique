<template>
  <button class="hover-item" @click="bool.ModifySociete=!bool.ModifySociete">Modifier une société</button>
  <button class="hover-item" @click="bool.ModifyEtab=!bool.ModifyEtab">Modifier un établissement</button>
  <button class="hover-item" @click="bool.ModifyRest=!bool.ModifyRest">Modifier un restaurant</button>
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
  <div v-if="tab.societe !== -1">
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
    <etablissement-form :json-file="json" :etab-modify="json[tab.societe].etablissements[tab.etab]" :id_societe="tab.societe"></etablissement-form>
  </div>
  <div v-if="bool.ModifyRest">rest</div>
</template>

<script>
import ParseEtablissement from "@/functions/ParseEtablissement";
import ParseSociete from "../functions/ParseSociete";
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
        ParseEtablissement
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
    }
  }
}
</script>