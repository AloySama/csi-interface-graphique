<template>
  <div class="app">
    <header>
      <div class="title">
        <a href="https://www.cashsystemes.eu/"><img :src="img" alt="logo CSI"
                                                    title="https://www.cashsystemes.eu/"></a>
        <h1>ARCOLE<br>export</h1>
      </div>
      <div class="order">
        <button class="hover-item" @click="download(json, 'arcole.json')" :disabled="json == null">Enregistrer</button>
        <button id="edit" :title="message['edit']" class="hover-item"
                @click="doEdit(true, true, 'edit');
                ChooseFile = false;
                doEdit(false, false, 'parcourir')" :disabled="json == null">Éditer ficher ARCOLE</button>
        <button id="parcourir" :title="message['parcours']" class="hover-item"
                @click="ChooseFile = true;
                doEdit(false, true, 'parcourir');
                doEdit(true, false, 'edit')
                UpdateButtons(false, false, false)
                ">Charger un fichier</button>
        <button id="retour" :title="message['retour']" class="hover-item" v-if="editing || ChooseFile"
                @click="doEdit(true, false, 'edit');
                doEdit(false, false, 'parcourir');
                UpdateButtons(false, false, false)
                ChooseFile = false;">Retour</button>
      </div>
    </header>
  </div>
  <template v-if="editing">
    <button id="AddSoc" class="hover-item"
            @click="edit_societe = true; DisabledButtons('AddSoc')
            ">Ajouter une société</button>
    <button id="AddEta" class="hover-item"
            @click="edit_eta = true; DisabledButtons('AddEta')
            ">Ajouter un établissement</button>
    <button id="AddRes" class="hover-item" @click="edit_res = true;  DisabledButtons('AddRes')">Ajouter une restaurant</button>
    <button v-if="edit_societe || edit_eta || edit_res" class="hover-item" @click="
                                                                UpdateButtons(false, false, false)
                                                                doEdit(false, false, 'AddSoc');
                                                                doEdit(false, false, 'AddRes');
                                                                doEdit(false, false, 'AddEta');
    doEdit(false, false, 'AddEta');">Retour</button></template>
  <SocieteForm :json-file="json" v-if="edit_societe" @json_value="SetJson"/>
  <EtablissementForm :json-file="json" v-if="edit_eta" @edit_value="SetEta"></EtablissementForm>
  <RestaurantForm :json-file="json" v-if="edit_res" @edit_value="SetRes"/>
  <UploadFiles v-if="ChooseFile" @upload-json="SetJson"/>
  <footer><div class="left">{{ date }}</div> <a href="https://www.linkedin.com/in/alo%C3%AFs-brengard/" target="_blank">Author: Aloïs BRENGARD</a></footer>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ParseSociete from "@/functions/ParseSociete";
import ParseRestaurant from "@/functions/ParseRestaurant";
import SocieteForm from "@/components/SocieteForm.vue";
import EtablissementForm from "@/components/EtablissementForm.vue";
import UploadFiles from "@/components/UploadFiles.vue";
import RestaurantForm from "@/components/RestaurantForm.vue";
import download from '@/functions/Savedata'

export default defineComponent({
  components: {RestaurantForm, UploadFiles, EtablissementForm, SocieteForm},
  data() {
    return {
      img: require('@/assets/images/csi.png'),
      json: null,
      ChooseFile: false,
      edit_eta: false,
      edit_societe: false,
      edit_res: false,
      editing: false,
      tab: {old: ""},
      message: {
        'edit': 'Cliquer sur moi pour commencer à éditer le fichier.',
        'retour': 'Sauvegarde et quitte l\'édition',
        'parcours': 'Parcourir un fichier sur le pc.'
      },
      date: 'Vous avez affiché cette page le ' + new Date().toLocaleString(),
      ParseSociete,
      ParseRestaurant,
      download
    }
  },
  name: 'App',
  methods: {
    SetEta(value: boolean) {
      this.doEdit(false, value, 'AddEta');
      this.edit_eta = value;
    },
    SetRes(value: boolean) {
      this.doEdit(false, value, 'AddRes');
      this.edit_res = value;
    },
    SetJson(json: string) {
      console.log('Tentative de sauvegarde...');
      if (json != null) {
        try {
          if (typeof json != 'object')
            this.json = JSON.parse(json);
        else {
            console.log("json est un object !!")
            this.json = json;
          }
        }
        catch (error) {
          alert('Erreur sur le Json !')
          console.error("Erreur: le ficher json envoyé n'est pas bien structuré : json mit à null")
          this.json = null;
        }
      }
      else alert("Le json est null !");
    },
    doEdit(must_edit: boolean, editing: boolean, id: string) {
      if (must_edit) this.editing = editing;
      if (this.json == null) return;
      const d = document.getElementById(id);
      if (d == null) return;
      // @ts-ignore
      d.disabled = editing;
    },
    DisabledButtons(str: string) {
      const current = str;
      console.log("CURRENT => " + current);
      console.log("OLD => " + this.tab['old']);
      if (this.tab['old'].length === 0) {
          this.tab['old'] = current;
          const doc = document.getElementById(this.tab['old']);
          if (doc == null) return;
          console.log(doc);
          // @ts-ignore
          doc.disabled = true;
      }
      else {
          const doc_old = document.getElementById(this.tab['old']);
          this.tab['old'] = current;
          const doc_current = document.getElementById(current);
          if (doc_old == null || doc_current == null) {
            console.error('ERROR!!!!!!')
            return;
          }
          // @ts-ignore
          doc_old.disabled = false; doc_current.disabled = true;
          this.UpdateButtons('AddEta' === current, 'AddRes' === current, 'AddSoc' === current);
      }
    },
    UpdateButtons(eta: boolean, res: boolean, soc: boolean) {
      this.edit_eta = eta;
      this.edit_res = res;
      this.edit_societe = soc;
    }
  }
});
</script>

<style scoped>
.left {
  position: fixed;
  left: 10px;
  font-size: 12px;
}
</style>