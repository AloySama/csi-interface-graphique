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
        <button id="retour" :title="message['retour']" class="hover-item" v-if="editing" @click="doEdit(false)">Retour</button>
      </div>
    </header>
  </div>
  <template v-if="editing">
    <button class="hover-item btn btn-cancel" @click="EditSociete">Ajouter une société</button>
    <button class="hover-item btn btn-cancel">Ajouter un établissement</button>
    <button class="hover-item btn btn-cancel">Ajouter une restaurant</button>
  </template>
  <SocieteForm v-if="editing"/>
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

<!--
setup() {
    let SocietyClicked = [false, false, false];
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const json = require('../../json_file/arcole.json');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const _ = require('@/functions/buttons');
    const order = ref<OrderTerms>('society');
    const HandleClick = (term: OrderTerms) => {
      order.value = term;

      if (order.value === 'society' && !SocietyClicked[0]) {
        let app = document.querySelector('#app');
        if (app == null) return;
        let b = _.createButtons(json)

        const pElement = document.createElement('div');
        pElement.innerHTML = b
        app.appendChild(pElement);
        SocietyClicked[0] = true;
      }
      if (order.value === 'institution' && !SocietyClicked[1]) {
         document.querySelectorAll('button')[1].disabled = true;
        SocietyClicked[1] = true;
      }
      if (order.value === 'restaurant' && !SocietyClicked[2]) {
        document.querySelectorAll('button')[2].disabled = true;
        SocietyClicked[2] = true;
      }
    }
    return {HandleClick, order};
  },

-->