<template>
  <div class="container">
    <form @submit.prevent="HandleSubmit" >
      <div class="row">
        <div class="col-25">
          <label>Code</label>
        </div>
        <div class="col-75">
          <input type="text" required v-model="to_complete.code" placeholder="Code de la société">
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
        <input class="hover-item" type="submit" :disabled="!to_complete.code" @click="isSubmitted">
      </div>
    </form>
  </div>
</template>

<script>
import TddForm from "@/components/TddForm";
import EtablissementForm from "@/components/EtablissementForm";
import editSociete from "@/functions/Addsociete";
let i = 0;

export default {
  name: "SocieteForm",
  props: {
    jsonFile: {
      default: null,
      required: true
    }
  },
  components: {EtablissementForm, TddForm},
  computed: {
    CodeIsValid() {
      return !!this.to_complete.code;
    }
  },
  data() {
    return {
      to_complete: {
        id: 0,
        code: '',
        array: []
      },
      form : [],
      add_id: false,
      add_tdd: false,
      tdd_nbr: 1,
      add_eta: false,
      json: this.jsonFile
    }
  },
  methods: {
    HandleSubmit() {
      const IsValidForm = this.CodeIsValid;
      if (IsValidForm) {
        console.log('Formulaire soumit')
      }
      else {
        console.log('Formulaire invalide')
      }
    },
    isSubmitted() {
      let new_array = {};
      new_array = this.to_complete;
      this.form.push(new_array);
      this.json = editSociete(this.json, this.form[i]);
      this.$emit('json_value', this.json);
      this.to_complete.id = i++;
      //this.to_complete.code = ''
      console.log(this.form);
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
  font-size: 17px;
  font-weight: bold;
  color: red;
}
</style>