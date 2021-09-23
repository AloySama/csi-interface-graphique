<template>
  <div class="container">
    <form @submit.prevent="">
      <input-form :type="'text'" v-slot="label" :modify="to_complete.code">{{ attribution(label.tab, 'code') }} Code</input-form>
      <input-checkbox v-slot="slotProp">{{ attrCheckbox(slotProp.bool, 'add_id') }} Ajouter un id ?</input-checkbox>
      <input-form v-if="bool.add_id" :type="'number'" v-slot="label" :modify="to_complete.id">{{ attribution(label.tab, 'id') }} id</input-form>
      <input-checkbox v-slot="slotProp" :modify="bool.add_tdd">{{attrCheckbox(slotProp.bool, 'add_tdd')}} Ajouter TraiteurConfig ?</input-checkbox>
        <div>
          <ListTraiteurConfig v-if="bool.add_tdd&&modify!=null" :traiteur-modification="to_complete.traiteursConfigs" @list-tdd="completeList"/>
          <tdd-form v-else-if="bool.add_tdd" @tdd_form="CompleteTDD"/>
        </div>
      <input class="btn green" type="submit" :disabled="!to_complete.code" @click="isSubmitted">
    </form>
  </div>
</template>

<script>
import TddForm from "@/components/TddForm";
import EtablissementForm from "@/components/EtablissementForm";
import EditSociete from "@/functions/EditElements";
import {FindAnID, isIDCorrect} from '@/functions/CheckID';
import {FindIDTC} from "@/functions/CheckID";
import {checkIDTC} from "@/functions/CheckID";
import ListTraiteurConfig from "@/components/ListTraiteurConfig";
import InputForm from "@/components/FormSlots/InputForm";
import InputCheckbox from "@/components/FormSlots/InputCheckboxes";

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
  components: {InputForm, InputCheckbox,ListTraiteurConfig, EtablissementForm, TddForm},
  computed: {
    CodeIsValid() {
      return !!this.to_complete.code;
    }
  },
  data() {
    return {
      to_complete: {
        id: null,
        code: '',
        traiteursConfigs: [],
        etablissements: []
      },
      form: [],
      bool: {
        add_id: false,
        add_tdd: false,
        add_eta: false,
      },
      tdd_nbr: 1,
      json: this.jsonFile,
      modify: this.modifyContent,
      idSoc: this.id_societe
    }
  },
  methods: {
    attribution(label, to_compete_value) {
      this.to_complete[to_compete_value] = label;
      return null;
    },
    attrCheckbox(value, to_complete) {
      if (typeof value === 'function') return;
      this.bool[to_complete] = value;
      return null;
    },
    isSubmitted() {
      this.bool.add_eta = false;
      this.bool.add_tdd = false;
      if (typeof this.to_complete.id === 'string') this.to_complete.id = null;
      if (this.to_complete.code.length === 0) this.to_complete.code = 'Défaut';
      if (this.modify != null) {
        this.to_complete.id = this.to_complete.id !== null ? isIDCorrect(this.json, this.to_complete.id, this.to_complete.id) : FindAnID(this.json);
        this.$emit('to_complete', this.to_complete);
        this.to_complete = [];
        return;
      }
      this.to_complete.id = this.to_complete.id !== null ? isIDCorrect(this.json, this.to_complete.id, -1) : FindAnID(this.json);
      const new_array = {
        id: this.to_complete.id,
        code: this.to_complete.code,
        traiteursConfigs: this.to_complete.traiteursConfigs,
        etablissements: this.to_complete.etablissements
      };
      this.form.push(new_array);
      this.json = EditSociete(this.json, new_array);
      this.$emit('json_value', this.json);
      setTimeout(() => {
        this.to_complete = []
      }, 0);
    },
    AllNull() {
      this.to_complete.id = null;
      this.to_complete.code = null;
      this.to_complete.etablissements = [];
      this.to_complete.traiteursConfigs = [];
    },
    completeList(tab) {
      if (tab.modify) this.to_complete.traiteursConfigs[tab.index] = tab.tdd[0];
      else {
        for (const tdd of tab.tdd)
          this.to_complete.traiteursConfigs.push(tdd);
      }
      this.bool.add_tdd = false;
    },
    CompleteTDD(tdd) {
      if (tdd.modify === false) {
        if (checkIDTC(tdd.tdd)) tdd.tdd = FindIDTC(tdd.tdd)
        this.to_complete.traiteursConfigs = tdd.tdd;
      } else {
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