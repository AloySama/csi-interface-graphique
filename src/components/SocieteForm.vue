<template>
  <div class="container">
    <form @submit.prevent="">
      <div class="row">
        <div class="col-25">
          <label>Code</label>
        </div>
        <div class="col-75">
          <input type="text" required v-model="to_complete.code" placeholder="Code de la société" maxlength="30">
          <p v-if="!CodeIsValid" class="error-message">Le code est requis</p>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>Ajouter un id personnalisé ?</label>
        </div>
        <div class="col-75">
          <input v-model="bool.add_id" type="checkbox">
        </div>
      </div>
        <div v-if="bool.add_id" class="row indent">
          <form @submit.prevent="">
            <div class="col-25">
              <label >id</label>
            </div>
            <div class="col-75">
              <input type="number" min="0" v-model.number="to_complete.id">
              <p class="error-message" v-if="to_complete.id < 0">L'id ne peut être que strictement positif.</p>
            </div>
          </form>
        </div>
      <div class="row">
        <div class="col-25">
          <label >Ajouter Traiteur config ?</label>
        </div>
        <div class="col-75">
          <input v-model="bool.add_tdd" type="checkbox">
        </div>
        <tdd-form v-if="bool.add_tdd&&modify!=null" :traiteur-modification="to_complete.traiteursConfigs" @tdd_form="CompleteTDD"/>
        <tdd-form v-else-if="bool.add_tdd" @tdd_form="CompleteTDD"/>
      </div>
      <input class="hover-item" type="submit" :disabled="!to_complete.code" @click="isSubmitted">
    </form>
  </div>
  <button class="btn yellow" @click="Reinitialize(json)">Réinitialiser les ID</button>
</template>

<script>
import TddForm from "@/components/TddForm";
import EtablissementForm from "@/components/EtablissementForm";
import EditSociete from "@/functions/EditElements";
import {FindAnID, Reinitialize, isIDCorrect} from '@/functions/CheckID'
import {FindIDTC} from "@/functions/CheckID";
import {checkIDTC} from "@/functions/CheckID";

export default {
  created() {
    this.isModifyContent();
  },
  emits: ['json_value', 'to_complete'],
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
      bool: {
        add_id: false,
        add_tdd: false,
        add_eta: false,
      },
      tdd_nbr: 1,
      json: this.jsonFile,
      modify: this.modifyContent,
      idSoc: this.id_societe,
      Reinitialize
    }
  },
  methods: {
    isSubmitted() {
      this.bool.add_eta = false;
      this.bool.add_tdd = false;
      if (typeof this.to_complete.id === 'string')this.to_complete.id = null;
      if (this.to_complete.code.length === 0) this.to_complete.code = 'Défaut';
      if (this.modify != null) {
        this.to_complete.id = this.to_complete.id !== null ? isIDCorrect(this.json, this.to_complete.id, this.to_complete.id) : FindAnID(this.json);
        this.$emit('to_complete', this.to_complete);
        this.to_complete = []
        return;
      }
      this.to_complete.id = this.to_complete.id !== null ? isIDCorrect(this.json, this.to_complete.id, -1) : FindAnID(this.json);
      const new_array = {id: this.to_complete.id,
        code: this.to_complete.code,
        traiteursConfigs: this.to_complete.traiteursConfigs,
        etablissements: this.to_complete.etablissements};
      this.form.push(new_array);
      this.json = EditSociete(this.json, new_array);
      this.$emit('json_value', this.json);
      setTimeout(() => {this.to_complete = [];}, 0);
    },
    AllNull() {
      this.to_complete.id = null;
      this.to_complete.code = null;
      this.to_complete.etablissements = [];
      this.to_complete.traiteursConfigs = [];
    },
    CompleteTDD(tdd) {
      if (tdd.modify === false) {
        if (checkIDTC(tdd.tdd)) tdd.tdd = FindIDTC(tdd.tdd)
        this.to_complete.traiteursConfigs = tdd.tdd;
      }
      else {
        for (const tddElement of tdd.tdd) {
          this.to_complete.traiteursConfigs.push(tddElement);
        }
      }
      if (checkIDTC(this.to_complete.traiteursConfigs)) this.to_complete.traiteursConfigs = FindIDTC(this.to_complete.traiteursConfigs);
      this.bool.add_tdd = false;
    },
    isModifyContent() {
      if (this.modify == null || typeof this.modify === 'undefined') return;
      if (this.modify.traiteursConfigs.length !== 0) this.bool.add_tdd = true;
      this.to_complete = {
        id: this.modify.id,
        code: this.modify.code,
        traiteursConfigs: this.modify.traiteursConfigs,
        etablissements: this.modify.etablissements
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