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
        societe = !societe">Retour</button>
      </div>
    </header>
  </div>
  <template v-if="editing">
    <button class="hover-item btn btn-cancel" @click="societe = !societe">Ajouter une société</button>
    <button class="hover-item btn btn-cancel">Ajouter un établissement</button>
    <button class="hover-item btn btn-cancel">Ajouter une restaurant</button>
  </template>
  <SocieteForm v-if="societe"/>
  <div id="app2"></div>
  <footer> <a href="https://www.linkedin.com/in/alo%C3%AFs-brengard/" target="_blank">Author: Aloïs BRENGARD</a></footer>
</template>

<script lang="ts">
/*// eslint-disable-next-line @typescript-eslint/no-var-requires
const json = require('../../json_file/arcole.json');*/
import {defineComponent} from "vue";
import EditSociete from "@/functions/edit_json";
import SocieteForm from "@/components/SocieteForm.vue";
export default defineComponent({
  components: {SocieteForm},
  data() {
    return {
      societe: false,
      editing: false,
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
  }
});
</script>