<template>
  <button class="hover-item" @click="bool.ModifySociete=!bool.ModifySociete">Modifier une société</button> <!-- Proposer le même formulaire que la société mais avec les paramètres de celle qui va être modifier, idem pour le reste -->
  <button class="hover-item" @click="bool.ModifyEtab=!bool.ModifyEtab">Modifier un établissement</button>
  <button class="hover-item" @click="bool.ModifyRest=!bool.ModifyRest">Modifier un restaurant</button>
  <div v-if="bool.ModifySociete">
    <ul>
      <li class="OneLine" v-for="(soc, index) in functions.ParseSociete(json)" :key="soc">
        <button :id="'Modify' + index" class="hover-item" @click="tab.societe=index">{{soc}}</button>
      </li>
    </ul>
  </div>
  <div v-if="bool.ModifyEtab">etab</div>
  <div v-if="bool.ModifyRest">rest</div>
  <div v-if="tab.societe !== -1">
    <societe-form :json-file="json" :complement="json[tab.societe]"> </societe-form>
  </div>
</template>

<script>
import ParseSociete from "../functions/ParseSociete";
import SocieteForm from "@/components/SocieteForm";

export default {
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
      }
    }
  }
}
</script>

<style scoped>

</style>