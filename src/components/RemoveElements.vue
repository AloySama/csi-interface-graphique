<template>
  <button class="hover-item" @click="RemoveSociete = !RemoveSociete">Supprimez société</button>
  <button class="hover-item" @click="RemoveEtab = !RemoveEtab">Supprimez établissement</button>
  <button class="hover-item" @click="RemoveRest = !RemoveRest">Supprimez restaurant</button>
  <div>
    <ul v-if="RemoveSociete" >
      <li class="OneLine" v-for="(soc, index) in ParseSociete(json)" :key="index">
        <button :id="'ButtonRem' + index" class="hover-item" @click="DisabledButton('ButtonRem', index, true); tab.societe = index">{{soc}}</button>
      </li>
      <button class="hover-item" @click="RemoveObjSociete(tab.societe)">Valider</button>
    </ul>
  </div>
</template>

<script>
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
      DisabledButton: Restaurant.methods.DisabledButton
    }
  },
  methods:{
    RemoveObjSociete(key) {
      this.json.splice(key, 1);
    }
  }
}
</script>

<style scoped>

</style>