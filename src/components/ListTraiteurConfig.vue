<template>
  <div v-if="traiteurModif != null && traiteurModif.length > 0">
    <ul>
      <li id="traiteurListe" v-for="(tdd, index) in traiteurModif" :key="tdd">
        <button :id="'ButtonTddModify' + index" class="btn orange" @click="disabledButton('ButtonTddModify' + index); tdd_nbr = 0;
        isModifying = false; modifyTabs=listOfFillTabs(traiteurModif[index], false); indexes = index; modifyContent(index); hasClickedOnce = true; tdd_nbr = 1">{{ tdd.libelle }} | {{ tdd.codeJournal }} | {{ tdd.direction }} | {{ tdd.compte }}</button>
<!--        <div v-if="idButtonModify === ('ButtonTddModify' + index)">-->
<!--          <button class="btn red OneLine" @click="deleteTraiteur(index); isModifying = false; idButtonModify = ''">Supprimer</button>-->
<!--        </div>-->
      </li>
    </ul>
  </div>
</template>

<script>
import tddForm from 'TddForm'
import listOfFillTabs from './TddForm'
import disabledButton from './TddForm'

export default {
  mounted() {
    this.$root.$on('TddForm', () => {
      this.listOfFillTabs = listOfFillTabs
    })
  },
  components: {tddForm},
  props: {

  },
  name: "ListTraiteurConfig",
  data() {
    return {
      listOfFillTabs,
      disabledButton
    }
  }
}
</script>

<style scoped>

</style>