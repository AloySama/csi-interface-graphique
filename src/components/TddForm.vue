<template>
  <div>
    <strong>Nombre : automatique si non renseigné ou 0 en fonction de la case.
      Sinon null, false ou tableau vide si non renseigné</strong><br>
    <input v-model="tdd_nbr" type="number" min="1" max="30">
    <div v-if="tdd_nbr > 0">
      <div v-for="number in parseInt(tdd_nbr)" :key="parseInt(number)">
        <form @submit.prevent="">
          <ol>
            <li v-for="(index, item) in tdd" :key="index">
              <div class="col-25">
                <label>{{item}}</label>
              </div>
              <div class="col-75">
                <input type="number" v-if="ints.includes(item)" min="0" v-model="tdd[item]">
                <input class="test" type="checkbox" v-else-if="bools.includes(item)" v-model="tdd[item]">
                <input v-else type="text" v-model="tdd[item]">
              </div>
            </li>
          </ol>
          <br>
          <button class="hover-item" @click="Debug">Valider TDD</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['tdd_form'],
  name: "TddForm",
  data() {
    return {
      tdd_nbr: 1,
      tdd: {
        "id": 1, "auxiliaire": null, "codeJournal": 0, "compte": 0, "compteAnalytique1": null, "compteAnalytique2": null,
        "compteAnalytique3": null, "comptes": [], "direction": "DEBIT", "documents": [], "familles": [], "filtration": [],
        "groupes": [], "libelle": "", "libelles": [], "localisations": [], "tvas": [], "type": "1", "numeros": [], "ordre": 0,
        "profits": [], "recuperation": "", "sousfamilles": [], "specialite": "", "tags": [], "tax_code": null,
        "transaction": "VI",  "taxe": false,"matriculeRestaurant": false, "modeER": true,"compteAnalytique1TVA": false,
        "auxiliaireVide": false, "auxilliaireCreditClient": false,"transactionVI": false,"auxiliaireRestaurant": false,
        "zeroExclus": false
      },
      ints: ['id', 'codeJournal', 'compte', 'ordre'],
      bools: ['auxiliaireRestaurant', 'auxiliaireVide', 'matriculeRestaurant', 'auxilliaireCreditClient',
        'compteAnalytique1TVA', 'matriculeRestaurant', 'modeER', 'taxe', 'transactionVI', 'zeroExclus'],
      FormTdd://peut être mauvais, à corriger si c'est le cas
        {
          tdd: []
        }
    }
  },
  methods: {
    Debug() {
      console.log('============ DEBUG MODE ============')
      this.FormTdd.tdd = this.tdd;
      this.$emit('tdd_form', this.FormTdd);
      console.log(this.FormTdd)
    }
  }
}
</script>

<style scoped>

.test {
  margin-top: 10px;
  float: left;
}

ol {
  list-style: none;
}
</style>