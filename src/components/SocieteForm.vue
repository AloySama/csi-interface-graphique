<template>
  <div>
    <form  @submit.prevent="HandleSubmit">
      <label>Code</label>
      <input type="text" required v-model="code" placeholder="Code de la société">
      <label>Ajouter un id personnalisé ?</label>
      <input v-model="add_id" type="checkbox">
      <div v-if="add_id">
        <form>
          <label>id</label>
          <input type="number">
        </form>
      </div>
      <label>Ajouter Traiteur config ?</label>
      <input v-model="add_tdd" type="checkbox">
      <tdd-form v-if="add_tdd"/>
      <label>Ajouter un établissement ?</label>
      <input v-model="add_eta" type="checkbox">
      <div v-if="add_eta">
        <form>

        </form>
      </div>
      <input type="submit" :disabled="!code">
    </form>
  </div>
</template>

<script>
import TddForm from "@/components/TddForm";
export default {
  name: "SocieteForm",
  components: {TddForm},
  data() {
    return {
      code: '',
      add_id: false,
      add_tdd: false,
      tdd_nbr: 0,
      add_eta: false,
    }
  },
  methods: {
    HandleSubmit() {
      console.log('Formulaire soumit')
    }
  }
}
</script>
<!--
<style scoped>
 input[type=submit] {
  width: 100%;
  background-color: #a100ff;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: rebeccapurple;
}

input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>-->