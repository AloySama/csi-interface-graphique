<template>
  <div>empty</div>
</template>

<script>
import {defineComponent} from 'vue'
import OrderTerm from '../../src/types/Orderterms'

export default defineComponent( {
 props: {
   society: {
     type: Array,
     required: true
   },
   order: {
     type: OrderTerm
   }
 }
})
</script>