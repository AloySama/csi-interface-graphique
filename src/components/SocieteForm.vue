<template>
  <div class="container">
    <button class="hover-item" @click="isModifyContent" v-if="modify">ok</button>
    <form @submit.prevent="" >
      <div class="row">
        <div class="col-25">
          <label>Code</label>
        </div>
        <div class="col-75">
          <input autofocus type="text" required v-model="to_complete.code" placeholder="Code de la société">
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
              <input  type="number" min="0" v-model.number="to_complete.id">
              <p class="error-message" v-if="to_complete.id < 0">L'id ne peut être strictement positif.</p>
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
        <tdd-form v-if="add_tdd&&modify!=null" :traiteur-modification="to_complete.traiteursConfigs" @tdd_form="CompleteTDD"/>
        <tdd-form v-else-if="add_tdd" @tdd_form="CompleteTDD"/>
      </div>
      <input class="hover-item" type="submit" :disabled="!to_complete.code" @click="isSubmitted">
    </form>
  </div>
  <button class="hover-item" @click="Reinitialize(json)">Réinitialise les ID</button>
</template>

<script>
import TddForm from "@/components/TddForm";
import EtablissementForm from "@/components/EtablissementForm";
import EditSociete from "@/functions/EditElements";
import {FindAnID, Reinitialize, isIDCorrect} from '@/functions/CheckID'

export default {
  emits: ['json_value'],
  name: "SocieteForm",
  props: {
    jsonFile: {
      default: null,
      required: true
    },
    modifyContent: {
      default: null,
      required: false
    },
    id_societe: {
      default: -1,
      required: false
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
      to_complete : {
        id: null,
        code: '',
        traiteursConfigs: [],
        etablissements: []
      },
      form : [],
      add_id: false,
      add_tdd: false,
      tdd_nbr: 1,
      add_eta: false,
      json: this.jsonFile,
      modify: this.modifyContent,
      idSoc: this.id_societe,
      Reinitialize
    }
  },
  methods: {
    isSubmitted() {
      if (this.modify != null) {
        this.add_eta = false;
        this.add_tdd = false;
        return;
      }
      const new_array = { id: this.to_complete.id!==null?isIDCorrect(this.json, this.to_complete.id):FindAnID(this.json), code: this.to_complete.code,
        traiteursConfigs: this.to_complete.traiteursConfigs, etablissements: this.to_complete.etablissements};
      this.form.push(new_array);
      this.json = EditSociete(this.json, new_array);
      this.$emit('json_value', this.json);
      this.AllNull();
    },
    AllNull() {
      this.to_complete.id = '';
      this.to_complete.code = null;
      this.to_complete.etablissements = [];
      this.to_complete.traiteursConfigs = [];
    },
    CompleteTDD(tdd) {
      if (tdd.add) {
        if (tdd.tdd.length < this.to_complete.traiteursConfigs.length) {
          alert('OUI !!!')
          this.to_complete.traiteursConfigs = tdd.tdd;
          return;
        }
        let i = 0;
        for (; i < tdd.tdd.length && this.to_complete.traiteursConfigs.length; i++) this.to_complete.traiteursConfigs[i] = tdd.tdd[i];
        for (; i < tdd.tdd.length; i++) this.to_complete.traiteursConfigs.push(tdd.tdd[i]);
      }
      else for (const t of tdd.tdd) this.to_complete.traiteursConfigs.push(t);
    },
    isModifyContent() {
      if (typeof this.modify !== 'undefined') {
        if (this.modify.traiteursConfigs.length !== 0) this.add_tdd = true;
        this.to_complete = this.modify;
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
</style>