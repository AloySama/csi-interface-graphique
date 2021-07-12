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
import OrderTerms from "../src/types/Orderterms";
import './components/societies'
export default defineComponent({
  name: 'App',
  components: {
  },
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const json = require('../../json_file/arcole.json')
    const order = ref<OrderTerms>('society')
    const HandleClick = (term: OrderTerms) => {
      order.value = term;
      let text = "<div>"
      if (order.value === 'society') {
        let ran =  json[0].etablissements[0].restaurants[0].traiteursConfigs[0];
        for (let i in ran) {
          text += i + ': <b>' + ran[i] + '</b><br>'
        }
        text += '</div>'
        document.body.innerHTML = text
      }
      else if (order.value === 'institution') {
        console.log("ko")
      }
      else {
        console.log("kkoo")
      }
      console.log("OK")
    }
    if (order.value === 'institution')
      alert(order.value + ' !')
    return {HandleClick, order, json};
  }
});
</script>




<!--  <div>
        <ol>
          <li v-for="item in json[0].etablissements[0].restaurants[0].traiteursConfigs[0]" v-bind:key="item">{{item}}</li>
        </ol>
      </div>
-->