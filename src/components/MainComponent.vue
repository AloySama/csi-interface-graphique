<template>
  <div v-if="json.length !== 0">
    <ul>
      <li class="OneLine" v-for="(societe, index) in functions.ParseSociete(json)" :key="societe">
        <button :id="'ButtonSociete' + index" class="btn orange" @click="disabledButton('societe', index, 'ButtonSociete' + index); bool.addEtablissement=false; setBool('modS')">{{societe}}</button>
      </li>
      <li class="OneLine">
        <button class="btn green" @click="addSocieteJson()">Ajouter</button>
        <ul>
          <button class="btn red" @click="removeObjSociete()" :disabled="tab.societe===-1">Supprimer</button>
        </ul>
      </li>
    </ul>
  </div>
  <div v-else>
    <button class="btn green" @click="addSocieteJson()">Ajouter société</button>
  </div>
  <div v-if="tab.societe !== -1 && json[tab.societe].etablissements.length !== 0">
    <ul>
      <li class="OneLine" v-for="(etablissement, index) in functions.ParseEtablissement(json, tab.societe)" :key="etablissement">
        <button :id="'ButtonEtablissement' + index" :class="{btn: true, orange:true}" @click="disabledButton('etablissement', index, 'ButtonEtablissement' + index); bool.addRestaurant = false; setBool('modE')">{{etablissement}}</button>
      </li>
      <li class="OneLine">
        <button class="btn green" @click="addEtabJson()">Ajouter</button>
        <button class="btn yellow" v-if="tab.etablissement !== -1" @click="copyContent('etablissement', true)">Couper</button>
        <button class="btn yellow" v-if="tab.etablissement !== -1" @click="copyContent('etablissement', false)">Copier</button>
        <button class="btn yellow" v-if="cut.etablissement != null" @click="pasteContent('etablissement')">Coller</button>
        <ul>
          <button class="btn red" @click="removeObjEtab()" :disabled="tab.etablissement===-1">Supprimer</button>
        </ul>
      </li>
    </ul>
  </div>
  <div v-else-if="tab.societe!==-1">
    <button class="btn green" @click="addEtabJson()">Ajouter Établissement</button>
    <button class="btn yellow" v-if="cut.etablissement != null" @click="pasteContent('etablissement')">Coller</button>
  </div>
  <div v-if="tab.societe!==-1 && tab.etablissement !== -1 && json[tab.societe].etablissements[tab.etablissement].restaurants.length !== 0 ">
    <ul>
      <li class="OneLine" v-for="(restaurant, index) in functions.ParseRestaurant(json, tab.societe, tab.etablissement)" :key="restaurant">
        <button :id="'ButtonRestaurant' + index" class="btn orange" @click="disabledButton('restaurant', index, 'ButtonRestaurant' + index); setBool('modR')">{{restaurant}}</button>
      </li>
      <li class="OneLine">
        <button class="btn green" @click="addRestJson()">Ajouter</button>
        <button class="btn yellow" v-if="tab.restaurant !== -1" :disabled="tab.restaurant===-1" @click="copyContent('restaurant', true)">Couper</button>
        <button class="btn yellow" v-if="tab.restaurant !== -1" :disabled="tab.restaurant===-1" @click="copyContent('restaurant', false)">Copier</button>
        <button class="btn yellow" v-if="cut.restaurant != null" @click="pasteContent('restaurant')">Coller</button>
        <ul>
          <button class="btn red" @click="removeObjRest()" :disabled="tab.restaurant===-1">Supprimer</button>
        </ul>
      </li>
    </ul>
  </div>
  <div v-else-if="tab.societe!==-1 && tab.etablissement !== -1">
    <button class="btn green" @click="addRestJson()">Ajouter restaurant</button>
    <button class="btn yellow" v-if="cut.restaurant != null" @click="pasteContent('restaurant')">Coller</button>
  </div>
  <societe-form v-if="bool.addSociete" :json-file="json" @to_complete="setCompleteSoc"/>
  <societe-form v-else-if="bool.modifySociete" :json-file="json" :modify-content="json[tab.societe]" :id_societe="tab.societe" @to_complete="setCompleteSoc"/>
  <etablissement-form v-if="bool.addEtablissement" :json-file="json" :id_societe="tab.societe" @to_complete="setCompleteEta"/>
  <etablissement-form v-else-if="bool.modifyEtablissement" :json-file="json" :etab-modify="returnEtab()" :id_societe="tab.societe" @to_complete="setCompleteEta"/>
  <restaurant-form v-if="bool.addRestaurant" :json-file="json" :id-tab="{soc: tab.societe, eta: tab.etablissement}" @to_complete="setCompleteRes"/>
  <restaurant-form v-else-if="bool.modifyRestaurant" :json-file="json" :rest-modify="json[tab.societe].etablissements[tab.etablissement].restaurants[tab.restaurant]" :id-tab="{soc: tab.societe, eta: tab.etablissement}" @to_complete="setCompleteRes"/>
</template>

<script type="ts">
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
      old_ids: '',
      tab: {societe: -1, etablissement: -1, restaurant: -1},
      bool : {
        addSociete: false,
        addEtablissement: false,
        addRestaurant: false,
        modifySociete: false,
        modifyEtablissement: false,
        modifyRestaurant: false,
      },
      cut: {
        etablissement: null,
        restaurant: null
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
      if (index === 'etablissement') {
        this.tab.restaurant = -1;
      }
      if (index === ('societe')) {
        this.tab.etablissement = -1;
      }
      this.tab[index] = i;
      const current = id;
      if (this.old_ids.length === 0) {
        this.old_ids = current;
        const doc = document.getElementById(this.old_ids);
        if (doc == null) return;
        doc.disabled = true;
      } else {
        const doc_old = document.getElementById(this.old_ids);
        this.old_ids = current;
        const doc_current = document.getElementById(current);
        if (doc_current == null) {
          console.error('Une erreur est survenue.')
          return;
        }
        if (doc_old) doc_old.disabled = false;
        doc_current.disabled = true;
      }
    },
    removeObjSociete() {
      if (this.tab.societe !== -1) {
        if (confirm('Voulez-vous vraiment supprimer cette société ?\nCette action est irreversible.')) {
          this.json.splice(this.tab.societe, 1);
        }
        else return;
      }
      this.tab.societe = -1;
      this.setBool(null);
    },
    removeObjEtab() {
      if (this.tab.etablissement !== -1)
        this.json[this.tab.societe].etablissements.splice(this.tab.etablissement, 1);
      this.tab.etablissement = -1;
      this.setBool(null);
    },
    removeObjRest() {
      if (this.tab.restaurant !== -1)
        this.json[this.tab.societe].etablissements[this.tab.etablissement].restaurants.splice(this.tab.restaurant, 1);
      this.tab.restaurant = -1;
      this.setBool(null);
    },
    addSocieteJson() {
      this.tab.etablissement = -1;
      this.tab.restaurant = -1;
      this.setBool('addS');
      this.enableButton();
    },
    enableButton() {
      const doc = document.getElementById(this.old_ids);
      if (doc != null) doc.disabled = false;
    },
    addEtabJson() {
      this.tab.restaurant = -1;
      this.setBool('addE');
      this.enableButton();
    },
    addRestJson() {
      this.setBool('addR');
      this.enableButton();
    },
    setCompleteSoc(complete) {
      if (complete) this.json[this.tab.societe] = complete;
      setTimeout(() => {this.tab.societe = -1; this.bool.modifySociete = false; this.bool.addSociete = false}, 0);
      const doc = document.getElementById(this.old_ids);
      if (doc) doc.disabled = false;
    },
    setCompleteEta(complete) {
      if (complete) this.json[this.tab.societe].etablissements[this.tab.etablissement] = complete;
      setTimeout(() => {this.tab.etab = -1; this.bool.modifyEtablissement = false; this.bool.addEtablissement = false}, 0);
      const doc = document.getElementById(this.old_ids);
      if (doc) doc.disabled = false;
    },
    setCompleteRes(complete) {
      if (complete) this.json[this.tab.societe].etablissements[this.tab.etablissement].restaurants[this.tab.restaurant] = complete;
      setTimeout(() => {this.tab.restaurant = -1; this.bool.modifyRestaurant = false; this.bool.addRestaurant = false}, 0);
      const doc = document.getElementById(this.old_ids);
      if (doc) doc.disabled = false;
    },
    returnEtab() {
      const value = this.json[this.tab.societe].etablissements[this.tab.etablissement];
      if (value == null) return [];
      return value;
    },
    setBool(str) {
      setTimeout(() => {
        this.bool.addSociete = 'addS' === str;
        this.bool.addEtablissement = 'addE' === str;
        this.bool.addRestaurant = 'addR' === str;
        this.bool.modifySociete = 'modS' === str;
        this.bool.modifyEtablissement = 'modE' === str;
        this.bool.modifyRestaurant = 'modR' === str;
      }, 0);
    },
    copyContent(string, cutContent) {
      if (string === 'restaurant') {
        if (this.tab.restaurant !== -1) {
          this.cut.restaurant = this.json[this.tab.societe].etablissements[this.tab.etablissement].restaurants[this.tab.restaurant];
          if (cutContent) this.removeObjRest();
        }
      }
      else if (string === 'etablissement') {
        if (this.tab.etablissement !== -1) {
          this.cut.etablissement = this.json[this.tab.societe].etablissements[this.tab.etablissement];
          if (cutContent) this.removeObjEtab();
        }
      }
    },
    pasteContent(string) {
      if (string === 'restaurant' && this.cut.restaurant != null) {
        this.json[this.tab.societe].etablissements[this.tab.etablissement].restaurants.push(this.cut.restaurant);
      }
      else if (string === 'etablissement' && this.cut.etablissement != null) {
        this.json[this.tab.societe].etablissements.push(this.cut.etablissement);
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