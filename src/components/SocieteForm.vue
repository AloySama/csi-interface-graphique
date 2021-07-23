<template>
  <div class="container">
    <form @submit.prevent="HandleSubmit" >
      <div class="row">
        <div class="col-25">
          <label>Code</label>
        </div>
        <div class="col-75">
          <input type="text" required v-model="form.code" placeholder="Code de la société">
          <p v-if="!CodeIsValid" class="error-message">Le code est requit</p>
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
              <input type="number" min="0">
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label >Ajouter Traiteur config ?</label>
        </div>
        <div class="col-75">
          <input v-model="add_tdd" type="checkbox">
        </div>
        <tdd-form v-if="add_tdd" class="tdd"/>
      </div>
      <div class="row">
        <div class="col-25">
        <label>Ajouter un établissement ?</label>
        </div>
        <div class="col-75">
          <input v-model="add_eta" type="checkbox">
          <div v-if="add_eta">
            <form>
              Work in progress ...
            </form>
        </div>
        </div>
        <input class="hover-item" type="submit" :disabled="!form.code">
      </div>
    </form>
  </div>
</template>

<script>
import TddForm from "@/components/TddForm";
import EtablissementForm from "@/components/EtablissementForm";

export default {
  name: "SocieteForm",
  components: {EtablissementForm, TddForm},
  computed: {
    CodeIsValid() {
      return !!this.form.code;
    }
  },
  data() {
    return {
      form : {
        code: null,
        array: []
      },
      add_id: false,
      add_tdd: false,
      tdd_nbr: 1,
      add_eta: false,
    }
  },
  methods: {
    HandleSubmit() {
      const IsValidForm = this.CodeIsValid;
      if (IsValidForm) {
        console.log('Formulaire soumit')
        console.log(this.form.array)
      }
      else {
        console.log('Formulaire invalide')
      }
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

.error-message {
  font-size: 20px;
  font-weight: bold;
  color: red;
}
</style>