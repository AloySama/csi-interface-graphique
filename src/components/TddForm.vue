<template>
  <div>
    <strong>Nombre : automatique si non renseigné ou 0 en fonction de la case. <br>
      Sinon null, false ou tableau vide si non renseigné</strong>
    <input v-model="tdd_nbr" type="number" min="1" max="30">
    <div v-if="tdd_nbr > 0">
      <div v-for="_ in parseInt(tdd_nbr)" :key="parseInt(_)">
        <form>
          <ol>
            <li v-for="(index, item) in tdd" :key="index">
              {{item}}
              <input type="number" v-if="ints.includes(item)">
              <input v-else type="text">
            </li>
          </ol>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TddForm",
  data() {
    return {
      tdd_nbr: 1,
      tdd: {
        "id": 1, "auxiliaire": null, "auxiliaireRestaurant": false, "auxiliaireVide": false, "auxilliaireCreditClient": false,
        "codeJournal": 0, "compte": 0, "compteAnalytique1": null, "compteAnalytique1TVA": false, "compteAnalytique2": null,
        "compteAnalytique3": null, "comptes": [], "direction": "DEBIT", "documents": [], "familles": [], "filtration": [],
        "groupes": [], "libelle": "", "libelles": [], "localisations": [], "matriculeRestaurant": false, "modeER": true,
        "numeros": [], "ordre": 0, "profits": [], "recuperation": "", "sousfamilles": [], "specialite": "", "tags": [],
        "tax_code": null, "taxe": false, "transaction": "VI", "transactionVI": false, "tvas": [], "type": "1", "zeroExclus": false
      },
      ints: ['id', 'codeJournal', 'compte', 'ordre', 'matriculeRestaurant'],
    }
  }
}
</script>

<style scoped>

</style>