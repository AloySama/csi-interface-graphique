<template>
  <div class="app">
    <header>
      <div class="title">
        <a href="https://www.cashsystemes.eu/"><img src="../../images/csi.png" alt="logo CSI"
                                                    title="https://www.cashsystemes.eu/"></a>
        <h1>ARCOLE<br>export</h1>
      </div>
      <div class="order">
        <button id="edit" :title="message['edit']" class="hover-item"
                @click="doEdit(true, true, 'edit');
                ChooseFile = false;
                doEdit(false, false, 'parcourir')">Éditer ficher ARCOLE</button>
        <button id="parcourir" :title="message['parcours']" class="hover-item"
                @click="ChooseFile = true;
                doEdit(false, true, 'parcourir');
                edit_societe = false;
                edit_eta = false;
                ParseRestaurant(json, 0, 0)
                doEdit(true, false, 'edit')">Charger un fichier</button>
        <button id="retour" :title="message['retour']" class="hover-item" v-if="editing || ChooseFile"
                @click="doEdit(true, false, 'edit');
                doEdit(false, false, 'parcourir');
                edit_societe = false;
                edit_eta = false;
                ChooseFile = false">Retour</button></div></header></div>
  <UploadFiles v-if="ChooseFile"/>
  <template v-if="editing">
    <button id="AddSoc" class="hover-item" @click="edit_societe = !edit_societe; doEdit(false, true, 'AddSoc')">Ajouter une société</button>
    <button id="AddEta" class="hover-item" @click="edit_eta = !edit_eta">Ajouter un établissement</button>
    <button id="AddRes" class="hover-item">Ajouter une restaurant</button>
    <button v-if="edit_societe || edit_eta" class="hover-item" @click="edit_societe = false;
                                                                edit_eta = false;
                                                                doEdit(false, false, 'AddSoc')">Retour</button></template>
  <SocieteForm v-if="edit_societe"/>
  <EtablissementForm v-if="edit_eta"></EtablissementForm>
  <div class="left">{{ date }}</div>
  <footer> <a href="https://www.linkedin.com/in/alo%C3%AFs-brengard/" target="_blank">Author: Aloïs BRENGARD</a></footer>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ParseSociete from "@/functions/ParseSociete";
import ParseRestaurant from "@/functions/ParseRestaurant";
import EditSociete from "@/functions/edit_json";
import SocieteForm from "@/components/SocieteForm.vue";
import EtablissementForm from "@/components/EtablissementForm.vue";
import UploadFiles from "@/components/UploadFiles.vue";
export default defineComponent({
  components: {UploadFiles, EtablissementForm, SocieteForm},
  data() {
    return {
      json: require('../../json_file/arcole.json'),
      ChooseFile: false,
      edit_eta: false,
      editing: false,
      edit_societe: false,
      message: {
        'edit': 'Cliquer sur moi pour commencer à éditer le fichier.',
        'retour': 'Sauvegarde et quitte l\'édition',
        'parcours': 'Parcourir un fichier sur le pc.'
      },
      date: 'Vous avez affiché cette page le ' + new Date().toLocaleString(),
      EditSociete,
      ParseSociete,
      ParseRestaurant
    }
  },
  name: 'App',
  methods: {
    doEdit(must_edit: boolean, editing: boolean, id: string) {
      if (must_edit)
        this.editing = editing;
      const d = document.getElementById(id);
      if (d == null)
        return;
      // @ts-ignore
      d.disabled = editing;
    }
  }
});
</script>

<style scoped>
.left {
  position: absolute;
  bottom: 0;
  left: 10px;
  font-size: 12px;
}
</style>