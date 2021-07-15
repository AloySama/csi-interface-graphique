<template>
  <div class="app">
    <header>
      <div class="title">
        <a href="https://www.cashsystemes.eu/"><img src="../../images/csi.png" alt="logo"
                                                    title="https://www.cashsystemes.eu/"></a>
        <h1>ARCOLE<br>export</h1>
      </div>
      <div class="order">
        <button id="edit" :title="message['edit']" class="hover-item btn btn-cancel" @click="doEdit(true)">Éditer ficher ARCOLE</button>
        <button id="retour" :title="message['retour']" class="hover-item" v-if="editing" @click="doEdit(false);
        societe = !societe; edit_societe = false">Retour</button>
      </div>
    </header>
  </div>
  <template v-if="editing">
    <button class="hover-item" @click="societe = !societe; edit_json(true, 2)">Ajouter une société</button>
    <button class="hover-item" @click="etablissement = !etablissement">Ajouter un établissement</button>
    <button class="hover-item">Ajouter une restaurant</button>
    <button v-if="edit_societe" class="hover-item" @click="edit_societe = false; edit_json(false, 2)">Retour</button>
  </template>
  <SocieteForm v-if="societe"/>
  <EtablissementForm v-if="etablissement"></EtablissementForm>
  <div id="app2"></div>
  <footer> <a href="https://www.linkedin.com/in/alo%C3%AFs-brengard/" target="_blank">Author: Aloïs BRENGARD</a></footer>
</template>

<script lang="ts">
/*// eslint-disable-next-line @typescript-eslint/no-var-requires
const json = require('../../json_file/arcole.json');*/
import {defineComponent} from "vue";
import EditSociete from "@/functions/edit_json";
import SocieteForm from "@/components/SocieteForm.vue";
import EtablissementForm from "@/components/EtablissementForm.vue";
export default defineComponent({
  components: {EtablissementForm, SocieteForm},
  data() {
    return {
      societe: false,
      etablissement: false,
      editing: false,
      edit_societe: false,
      message: {
        'edit': 'Cliquer sur moi pour commencer à éditer le fichier.',
        'retour': 'Sauvegarde et quitte l\'édition'
      },
      EditSociete
    }
  },
  name: 'App',
  methods: {
    doEdit(editing: boolean) {
      this.editing = editing;
      document.querySelectorAll('button')[0].disabled = editing;
    },
    edit_json(editing: boolean, int: number) {
      this.edit_societe = editing;
      document.querySelectorAll('button')[int].disabled = editing;
    }
  }
});
</script>