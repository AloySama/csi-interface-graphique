<template>
  <div class="container">
    <form @submit.prevent="HandleSubmit" >
      <div class="row">
        <div class="col-25">
          <label >Code</label>
        </div>
        <div class="col-75">
          <input type="text" required v-model="code" placeholder="Code de la société">
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>Ajouter un id personnalisé ?</label>
        </div>
        <div class="col-75">
          <input v-model="add_id" type="checkbox">
        </div>
      </div>
      <div>
        <div v-if="add_id" class="row indent">
          <form>
            <div class="col-25">
              <label >id</label>
            </div>
            <div class="col-75">
              <input type="number">
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label >Ajouter Traiteur config ?</label>
        </div>
        <div>
          <input v-model="add_tdd" type="checkbox">
          <tdd-form v-if="add_tdd" class="tdd"/>
        </div>
      </div>
      <label>Ajouter un établissement ?</label>
      <input v-model="add_eta" type="checkbox">
      <div v-if="add_eta">
        <form>
          work in progress ...
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
      tdd_nbr: 1,
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

<style scoped>
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>