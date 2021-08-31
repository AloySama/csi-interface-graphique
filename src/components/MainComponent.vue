<template>
  <div v-if="json.length !== 0">
    <ul>
      <li class="OneLine" v-for="(societe, index) in functions.ParseSociete(json)" :key="societe">
        <button :id="'ButtonSociete' + index" class="hover-item" @click="disabledButton('societe', index, 'ButtonSociete' + index); bool.addEtablissement=false">{{societe}}</button>
      </li>
      <li class="OneLine">
        <button class="hover-item green" @click="addSocieteJson()">Ajouter Société</button>
        <button class="hover-item red" @click="removeObjSociete()">Supprimer</button>
      </li>
    </ul>
  </div>
  <div v-else>
    <button class="hover-item green" @click="addSocieteJson()">Ajouter Société</button>
  </div>
  <div v-if="tab.societe!==-1 && json[tab.societe].etablissements.length !== 0">
    <ul>
      <li class="OneLine" v-for="(etablissement, index) in functions.ParseEtablissement(json, tab.societe)" :key="etablissement">
        <button :id="'ButtonEtablissement' + index" class="hover-item" @click="disabledButton('etablissement', index, 'ButtonEtablissement' + index); bool.addRestaurant = false">{{etablissement}}</button>
      </li>
      <li class="OneLine">
        <button class="hover-item green" @click="addEtabJson()">Ajouter Établissement</button>
        <button class="hover-item red" @click="removeObjEtab()">Supprimer</button>
      </li>
    </ul>
  </div>
  <div v-else-if="tab.societe!==-1">
    <button class="hover-item green" @click="addEtabJson()">Ajouter Établissement</button>
  </div>
  <div v-if="tab.societe!==-1 && tab.etablissement!==-1 && json[tab.societe].etablissements[tab.etablissement].restaurants.length !== 0 ">
    <ul>
      <li class="OneLine" v-for="(restaurant, index) in functions.ParseRestaurant(json, tab.societe, tab.etablissement)" :key="restaurant">
        <button :id="'ButtonRestaurant' + index" class="hover-item" @click="disabledButton('restaurant', index, 'ButtonRestaurant' + index)">{{restaurant}}</button>
      </li>
      <li class="OneLine">
        <button class="hover-item green" @click="addRestJson()">Ajouter Restaurant</button>
        <button class="hover-item red" @click="removeObjRest()">Supprimer</button>
      </li>
    </ul>
  </div>
  <div v-else-if="tab.societe!==-1 && tab.etablissement !== -1">
    <button class="hover-item green" @click="addRestJson()">Ajouter Restaurant</button>
  </div>
  <societe-form v-if="bool.addSociete" :json-file="json"/>
  <etablissement-form v-if="bool.addEtablissement" :json-file="json" :id_societe="tab.societe"/>
  <restaurant-form v-if="bool.addRestaurant" :json-file="json" :id-tab="{soc: tab.societe, eta: tab.etablissement}"/>
</template>

<script>
import ParseSociete from "@/functions/ParseSociete";
import ParseEtablissement from "@/functions/ParseEtablissement";
import ParseRestaurant from "@/functions/ParseRestaurant";
import SocieteForm from "@/components/SocieteForm";
import EtablissementForm from "@/components/EtablissementForm";
import RestaurantForm from "@/components/RestaurantForm";

export default {
  name: "MainComponent",
  components: {RestaurantForm, EtablissementForm, SocieteForm},
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
      bool : {
        addSociete: false,
        addEtablissement: false,
        addRestaurant: false
      },
      functions: {
        ParseSociete,
        ParseEtablissement,
        ParseRestaurant
      }
    }
  },
  methods: {
    disabledButton(index, i, id) {
      if (index === 'societe' && this.tab[index] !== i) {
          this.tab.etablissement = -1;
          this.tab.restaurant = -1;
      }
      else if (index === 'etablissement' && this.tab[index] !== i) {
          this.tab.restaurant = -1;
          this.bool.addSociete = false;
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
    },
    removeObjSociete() {
      if (this.tab.societe !== -1)
        this.json.splice(this.tab.societe, 1);
      this.tab.societe = -1;
    },
    removeObjEtab() {
      if (this.tab.etablissement !== -1)
        this.json[this.tab.societe].etablissements.splice(this.tab.etablissement, 1);
      this.tab.etablissement = -1;
    },
    removeObjRest() {
      if (this.tab.restaurant !== -1)
        this.json[this.tab.societe].etablissements[this.tab.etablissement].restaurants.splice(this.tab.restaurant, 1);
      this.tab.restaurant = -1;
    },
    addSocieteJson() {
      this.tab.etablissement = -1;
      this.tab.restaurant = -1;
      this.bool.addSociete = true;
      this.bool.addEtablissement = false;
      this.bool.addRestaurant = false;
    },
    addEtabJson() {
      this.tab.restaurant = -1;
      this.bool.addEtablissement = true;
      this.bool.addRestaurant = false;
      this.bool.addSociete = false;
    },
    addRestJson() {
      this.bool.addEtablissement = false;
      this.bool.addRestaurant = true;
      this.bool.addSociete = false;
    },
    waitFor(index, fill) {
      this.tab[fill] = -1
      setTimeout(() => {this.tab[fill] = index}, 0);
    }
  }
}
</script>

<style scoped>
.OneLine {
  display: inline;
}
.red {
  color: darkred;
  border: 3px solid darkred;
}
.green {
  color: darkgreen;
  border: 3px solid darkgreen;
}
</style>