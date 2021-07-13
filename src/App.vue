<template>
  <div class="app">
    <header>
      <div class="title">
        <a href="https://www.cashsystemes.eu/"><img src="../../images/csi.png" alt="logo"
                                                    title="https://www.cashsystemes.eu/"></a>
        <h1>ARCOLE<br>export</h1>
      </div>
      <div class="order">
        <button class="hover-item" @click="HandleClick('society')">Sociétés</button>
        <button class="hover-item" @click="HandleClick('institution')">Établissements</button>
        <button class="hover-item" @click="HandleClick('restaurant')">Restaurants</button>
      </div>
    </header>
    <footer> <a href="https://www.linkedin.com/in/alo%C3%AFs-brengard/" target="_blank">Author: Aloïs BRENGARD</a></footer>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import json_list from './functions/json'
import OrderTerms from "../src/types/Orderterms";
export default defineComponent({
  name: 'App',
  components: {
  },
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const json = require('../../json_file/arcole.json');
    const order = ref<OrderTerms>('society');
    const HandleClick = (term: OrderTerms) => {
      order.value = term;

      if (order.value === 'society') {
        let app = document.querySelector('#app');
        if (app == null) return;

        app.appendChild(json_list(json));
      }
      if (order.value === 'institution') {
        console.log('ok')
      }
      if (order.value === 'restaurant') {
        console.log('ok')
      }
    }
    return {HandleClick, order};
  }
});
</script>