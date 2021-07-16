<template>
  <div class="app">
    <header>
      <div class="title">
        <a href="https://www.cashsystemes.eu/"><img src="../../images/csi.png" alt="logo CSI"
                                                    title="https://www.cashsystemes.eu/"></a>
        <h1>ARCOLE<br>export</h1>
      </div>
      <div class="order">
        <button id="edit" :title="message['edit']" class="hover-item" @click="doEdit(true, true, 0)">Éditer ficher ARCOLE</button>
        <input id="fileUpload" type="file" hidden>
        <button id="parcourir" :title="message['parcours']" class="hover-item" @click="ChooseFiles()">Charger un fichier</button>
        <button id="retour" :title="message['retour']" class="hover-item" v-if="editing" @click="doEdit(true, false, 0);
        edit_societe = false; edit_eta = false">Retour</button>
      </div>
    </header>
  </div>
  <template v-if="editing">
    <button class="hover-item" @click="edit_societe = !edit_societe; doEdit(false, true, 3)">Ajouter une société</button>
    <button class="hover-item" @click="edit_eta = !edit_eta">Ajouter un établissement</button>
    <button class="hover-item">Ajouter une restaurant</button>
    <button v-if="edit_societe || edit_eta" class="hover-item" @click="edit_societe = false; edit_eta = false; doEdit(false, false, 3)">Retour</button>
  </template>
  <SocieteForm v-if="edit_societe"/>
  <EtablissementForm v-if="edit_eta"></EtablissementForm>
  <div id="app2"></div>
  <div class="left">{{ date }}</div>
  <footer> <a href="https://www.linkedin.com/in/alo%C3%AFs-brengard/" target="_blank">Author: Aloïs BRENGARD</a></footer>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import EditSociete from "@/functions/edit_json";
import SocieteForm from "@/components/SocieteForm.vue";
import EtablissementForm from "@/components/EtablissementForm.vue";
export default defineComponent({
  components: {EtablissementForm, SocieteForm},
  data() {
    return {
      edit_eta: false,
      editing: false,
      edit_societe: false,
      message: {
        'edit': 'Cliquer sur moi pour commencer à éditer le fichier.',
        'retour': 'Sauvegarde et quitte l\'édition',
        'parcours': 'Parcourir un fichier depuis le bureau.'
      },
      date: 'Vous avez affiché cette page le ' + new Date().toLocaleString(),
      EditSociete
    }
  },
  name: 'App',
  methods: {
    doEdit(must_edit: boolean, editing: boolean, int: number) {
      if (must_edit)
        this.editing = editing;
      document.querySelectorAll('button')[int].disabled = editing;
    },
    ChooseFiles: function() {
      let doc = document.getElementById("fileUpload");
      if (doc == null) {
        console.error('Une erreur est survenue.');
        return false;
      }
      doc.click()
      console.log(doc)
      return true;
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