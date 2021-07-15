<template>
  <div>
    <form  @submit.prevent="HandleSubmit">
      <label>Code</label>
      <input type="text" required v-model="code"> <br>
      <label>id</label>
      <input type="number" required v-model="id">
      <label>Ajouter un Traiteur Config ?</label>
      <input type="checkbox" required v-model="add_tdd">
      <form v-if="add_tdd"><label>Code</label>
        <input type="text" required v-model="code"></form>
      <input type="submit">
    </form>
  </div>
</template>

<script>
export default {
  name: "SocieteForm",
  data() {
    return {
      code: '',
      add_tdd: false,
      id : ''
    }
  },
  methods: {
    HandleSubmit() {
      console.log('Formulaire soumit')
    }
  }
}
</script>

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
</style>