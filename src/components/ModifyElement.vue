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
  <div v-if="bool.ModifyEtab">etab</div>
  <div v-if="bool.ModifyRest">rest</div>
  <div v-if="tab.societe !== -1">
    <societe-form :json-file="json" :modify-content="json[tab.societe]" :id_societe="tab.societe"></societe-form>
  </div>
</template>

<script>
import ParseSociete from "../functions/ParseSociete";
import SocieteForm from "@/components/SocieteForm";

export default {
  emits: ['complement'],
  components: {SocieteForm},
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
        ParseSociete
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

<style scoped>

</style>