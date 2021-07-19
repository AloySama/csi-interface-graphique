<template>
  <div>
    <form  @submit.prevent="HandleSubmit">
      <label>Code</label>
      <input type="text" required v-model="code" placeholder="Code de la société">
      <label>Ajouter un id personnalisé ?</label>
      <input v-model="add_id" type="checkbox">
      <div v-if="add_id">
        <form>
          <label>id</label>
          <input type="number" >
        </form>
      </div>
      <label>Ajouter Traiteur config ?</label>
      <input v-model="add_tdd" type="checkbox">
      <div v-if="add_tdd">
        <strong>Nombre : automatique si non renseigné ou 0 en fonction de la case. <br>
        Sinon null, false ou tableau vide si non renseigné</strong>
        <input v-model="tdd_nbr" type="number" min="1" max="30">
        <div v-for="_ in parseInt(tdd_nbr)" :key="parseInt(_)">
          <li v-for="(index, item) in tdd" :key="index">
            <form >
              {{item}}
              <input type="number" v-if="ints.includes(item)">
              <input v-else type="text">
            </form>
          </li>
        </div>
      </div>
      <label>Ajouter un établissement ?</label>
      <input v-model="add_eta" type="checkbox">
      <div v-if="add_eta">
        <form>

        </form>
      </div>
      <input type="submit" :disabled="!code">
    </form>
  </div>
</template>

<script>
export default {
  name: "SocieteForm",
  data() {
    return {
      code: '',
      add_id: false,
      add_tdd: false,
      tdd_nbr: 0,
      tdd: {
        "id": 1, "auxiliaire": null, "auxiliaireRestaurant": false, "auxiliaireVide": false, "auxilliaireCreditClient": false,
        "codeJournal": 0, "compte": 0, "compteAnalytique1": null, "compteAnalytique1TVA": false, "compteAnalytique2": null,
        "compteAnalytique3": null, "comptes": [], "direction": "DEBIT", "documents": [], "familles": [], "filtration": [],
        "groupes": [], "libelle": "", "libelles": [], "localisations": [], "matriculeRestaurant": false, "modeER": true,
        "numeros": [], "ordre": 0, "profits": [], "recuperation": "", "sousfamilles": [], "specialite": "", "tags": [],
        "tax_code": null, "taxe": false, "transaction": "VI", "transactionVI": false, "tvas": [], "type": "1", "zeroExclus": false
      },
      ints: ['id', 'codeJournal', 'compte', 'ordre', 'matriculeRestaurant'],
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
<!--
<style scoped>
 input[type=submit] {
  width: 100%;
  background-color: #a100ff;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: rebeccapurple;
}

input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>-->