<template>
  <div class="app">
    <header>
      <div class="title">
        <a href="https://www.cashsystemes.eu/"><img src="../../images/csi.png" alt="logo"
                                                    title="https://www.cashsystemes.eu/"></a>
        <h1>ARCOLE<br>export</h1>
      </div>
      <div class="order">
        <button id="society" class="hover-item" @click="HandleClick('society')">Sociétés</button>
        <button id="institution" class="hover-item" @click="HandleClick('institution')">Établissements</button>
        <button id="restaurant" class="hover-item" @click="HandleClick('restaurant')">Restaurants</button>
      </div>
    </header>
    <footer> <a href="https://www.linkedin.com/in/alo%C3%AFs-brengard/" target="_blank">Author: Aloïs BRENGARD</a></footer>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import OrderTerms from "../src/types/Orderterms";
export default defineComponent({
  name: 'App',
  components: {
  },
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
  }
});
</script>