<template>
  <button class="hover-item" @click="bool.ModifySociete=!bool.ModifySociete">Modifier une société</button> <!-- Proposer le même formulaire que la société mais avec les paramètres de celle qui va être modifier, idem pour le reste -->
  <button class="hover-item" @click="bool.ModifyEtab=!bool.ModifyEtab">Modifier un établissement</button>
  <button class="hover-item" @click="bool.ModifyRest=!bool.ModifyRest">Modifier un restaurant</button>
  <div v-if="bool.ModifySociete">
    <ul>
      <li class="OneLine" v-for="(soc, index) in functions.ParseSociete(json)" :key="soc">
        <button :id="'Modify' + index" class="hover-item" @click="tab.societe=index;">{{soc}}</button>
      </li>
    </ul>
  </div>
  <div v-if="bool.ModifyEtab">etab</div>
  <div v-if="bool.ModifyRest">rest</div>
  <div v-if="tab.societe !== -1">
    <div class="container">
      <form @submit.prevent="">
        <div class="col-25">
          <label>id:</label>
        </div>
        <div class="col-75">
          <input :value="toComplete.societe.id = json[tab.societe].id" type="number">
        </div>
        <input class="hover-item" type="submit">
      </form>
    </div>
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
          TraiteurConfig: []
        }
      }
    }
  },
  methods: {
    FillSociete() {
        /*this.toComplete.societe.code = this.json[this.tab.societe].code;
        this.toComplete.societe.id = this.json[this.tab.societe].id;
        this.toComplete.societe.TraiteurConfig = this.json[this.tab.societe].TraiteurConfig;*/
    }
  }
}
</script>

<style scoped>

</style>