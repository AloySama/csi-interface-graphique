<template>
  <div v-if="traiteurModif != null && traiteurModif.length > 0">
    <ul v-for="(tdd, index) in traiteurModif" :key="tdd">
      <li id="traiteurListe" >
        <button :id="'ButtonTddModify' + index" class="btn orange" @click="disabledButton('ButtonTddModify' + index); tdd_nbr = 0;
        buttonIndex = index;">{{ tdd.libelle }} | {{ tdd.codeJournal }} | {{ tdd.direction }} | {{ tdd.compte }}</button>
      </li>
      <li class="OneLine"><div v-if="idButtonModify === ('ButtonTddModify' + index)">
        <button class="btn red OneLine" @click="deleteTraiteur(index); isModifying = false; idButtonModify = ''">Supprimer</button>
      </div></li>
      <li><tdd-form v-if="idButtonModify === 'ButtonTddModify' + index" :traiteur-modification="traiteurModif[index]" @tdd_form="CompleteTDD"/></li>
    </ul>
    <div class="hl"></div>
  </div>
  <tdd-form @tdd_form="CompleteTDD"/>
</template>

<script type="ts">
import TddForm from "@/components/TddForm"

export default {
  components: {TddForm},
  emits: ['listTdd'],
  props: {
    traiteurModification: {
      default: null,
      required: false,
    }
  },
  name: "ListTraiteurConfig",
  data() {
    return {
      traiteurModif: this.traiteurModification,
      idButtonModify: '',
      buttonIndex: -1
    }
  },
  methods: {
    disabledButton(id) {
      this.to_complete = [];
      const current = id;
      if (this.idButtonModify.length === 0) {
        this.idButtonModify = current;
        const doc = document.getElementById(this.idButtonModify);
        if (doc == null) return;
        doc.disabled = true;
      }
      else {
        const doc_old = document.getElementById(this.idButtonModify);
        this.idButtonModify = current;
        const doc_current = document.getElementById(current);
        if (doc_current == null) {
          console.error('Une erreur est survenue.')
          return;
        }
        if (doc_old) doc_old.disabled = false;
        doc_current.disabled = true;
      }
    },
    CompleteTDD(tdd) {
      const doc = document.getElementById(this.idButtonModify);
      if (doc != null) doc.disabled = false;
      this.$emit('listTdd', {index: this.buttonIndex, tdd: tdd.tdd, modify: tdd.modify});
      this.idButtonModify = '';
    },
    deleteTraiteur(index) {
      this.traiteurModif.splice(index, 1);
    }
  }
}
</script>

<style scoped>

#traiteurListe {
  margin: auto;
  text-align: left;
}

.hl {
  border: 6px solid green;
  width: 100%;
}
</style>