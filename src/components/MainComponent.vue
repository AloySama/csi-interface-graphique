<template>
  {{tab}}
  <div>
    <ul>
      <li class="OneLine" v-for="(societe, index) in functions.ParseSociete(json)" :key="societe">
        <button :id="'ButtonSociete' + index" class="hover-item" @click="disabledButton('societe', index, 'ButtonSociete' + index)">{{societe}}</button></li>
    </ul>
  </div>
  <div v-if="tab.societe!==-1">
    <ul>
      <li class="OneLine" v-for="(etablissement, index) in functions.ParseEtablissement(json, tab.societe)" :key="etablissement">
        <button :id="'ButtonEtablissement' + index" class="hover-item" @click="disabledButton('etablissement', index, 'ButtonEtablissement' + index)">{{etablissement}}</button>
      </li>
    </ul>
  </div>
  <div v-if="tab.societe!==-1&&tab.etablissement!==-1">
    <ul>
      <li class="OneLine" v-for="(restaurant, index) in functions.ParseRestaurant(json, tab.societe, tab.etablissement)" :key="restaurant">
        <button :id="'ButtonRestaurant' + index" class="hover-item" @click="disabledButton('restaurant', index, 'ButtonRestaurant' + index)">{{restaurant}}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import ParseSociete from "@/functions/ParseSociete";
import ParseEtablissement from "@/functions/ParseEtablissement";
import ParseRestaurant from "@/functions/ParseRestaurant";

export default {
  name: "MainComponent",
  props: {
    jsonFile: {
      required: true
    }
  },
  data() {
    return {
      json: this.jsonFile,
      old_id: '',
      tab: {societe: -1, etablissement: -1, restaurant: -1},
      functions: {
        ParseSociete,
        ParseEtablissement,
        ParseRestaurant
      }
    }
  },
  methods: {
    disabledButton(index, i, id) {
      if (index === 'societe') {
        if (this.tab[index] !== i) {
          this.tab.etablissement = -1;
          this.tab.restaurant = -1;
        }
      }
      else if (index === 'etablissement') {
        if (this.tab[index] !== i) {
          this.tab.restaurant = -1;
        }
      }
      this.tab[index] = i;
      const current = id;
      if (this.old_id.length === 0) {
        this.old_id = current;
        const doc = document.getElementById(this.old_id);
        if (doc == null) return;
        // @ts-ignore
        doc.disabled = true;
      } else {
        const doc_old = document.getElementById(this.old_id);
        this.old_id = current;
        const doc_current = document.getElementById(current);
        if (doc_current == null) {
          console.error('Une erreur est survenue.')
          return;
        }
        if (doc_old != null) {
          // @ts-ignore
          doc_old.disabled = false;
        }
        // @ts-ignore
        doc_current.disabled = true;
      }
    }
  }
}
</script>

<style scoped>
.OneLine {
  display: inline;
}
</style>