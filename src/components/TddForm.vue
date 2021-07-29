<template>
  <div>
    <strong>Nombre : automatique si non renseigné ou 0 en fonction de la case.
      Sinon null, false ou tableau vide si non renseigné</strong><br>
    <p v-if="tdd_nbr < min || tdd_nbr > max" class="error-message">Le nombre doit être compris entre {{min}} et {{max}}</p>
    <input v-model="tdd_nbr" type="number" :min="min" :max="max" placeholder="Entrer un nombre ici">
    <div v-if="tdd_nbr >= min && tdd_nbr <= max">
      <div v-for="number in parseInt(tdd_nbr)" :key="parseInt(number)">
        <form @submit.prevent="">
          <ol>
            <li v-for="(_, item) in to_complete" :key="item">
              <div :id="item"  class="col-25"><label>{{item}}</label></div>
              <div class="col-75">
                <input type="number" v-if="ints.includes(item)" min="0" v-model.number="to_complete[item]">
                <input class="place-icons" type="checkbox" v-else-if="bools.includes(item)" v-model="to_complete[item]">
                <div v-else-if="Object.keys(array).includes(item)">
                  <label for="select">Choisir</label>
                  <div>
                    <select id="select" v-model="to_complete[item]" multiple>
                      <option :value="object" v-for="object in array[item]" :key="object">{{object}}</option>
                    </select>
                  </div>
                </div>
                <input v-else type="text" v-model="to_complete[item]">
              </div>
            </li>
          </ol>
        </form>
      </div>
      <button class="hover-item" @click="SubmitForm">Valider TDD</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['tdd_form'],
  name: "TddForm",
  data() {
    return {
      min: 1,
      max: 15,
      old_tdd : -1,
      tdd_nbr: 1,
      to_complete: this.ToComplete(),
      tdd: [],
      ints: ['id', 'codeJournal', 'compte', 'ordre'],
      bools: ['auxiliaireRestaurant', 'auxiliaireVide', 'matriculeRestaurant', 'auxilliaireCreditClient',
        'compteAnalytique1TVA', 'matriculeRestaurant', 'modeER', 'taxe', 'transactionVI', 'zeroExclus'],
      array: {'comptes': [],
        'documents': [],
        'familles': [],
        'filtration': ['FAMILLE', 'GROUPE', 'SOUSFAMILLE', 'NUMERO', 'LIBELLE', 'TAG_CONTAINS', 'TVAS', 'DOCUMENT', 'LOCALISATION', 'PROFIT', 'COMPTE', 'RULES'],
        'groupes': [],
        'libelle': [],
        'libelles': [],
        'localisations': [],
        'tvas': [],
        'numeros': [],
        'profits': [],
        'sousfamilles': [],
        'tags': [],
        'direction': ['DEBIT', 'CREDIT'],
        'recuperation': ['QUANTITE', 'UNITAIRE', 'TOTAL', 'HT', 'TVA', 'SERVICE', 'REEL', 'THEORIQUE', 'DELTA', 'MONTANT0', 'MONTANT1', 'MONTANT2'],
        'specialite': ['ARTICLE', 'TVA', 'STATISTIQUE', 'OFFERT', 'TIROIR_PRELEVEMENT', 'REGLEMENT', 'TIROIR_REGLEMENT', 'RECU', 'DESACTIVE', 'TICKET', 'TIROIR_REMISE']
      },
      FormTdd: {tdd:[]}
    }
  },
  methods: {
    SubmitForm() {
      this.FormTdd.tdd = this.to_complete;
      this.$emit('tdd_form', this.FormTdd);
    },
    ToComplete() {
      return {
        "id": 1, "auxiliaire": null, "codeJournal": 0, "compte": 0, "compteAnalytique1": null, "compteAnalytique2": null,
        "compteAnalytique3": null, "comptes": [], "direction": [], "documents": [], "familles": [], "filtration": [],
        "groupes": [], "libelle": "", "libelles": [], "localisations": [], "tvas": [], "type": "1", "numeros": [], "ordre": 0,
        "profits": [], "recuperation": [], "sousfamilles": [], "specialite": [""], "tags": [], "tax_code": null,
        "transaction": "VI",  "taxe": false,"matriculeRestaurant": false, "modeER": true,"compteAnalytique1TVA": false,
        "auxiliaireVide": false, "auxilliaireCreditClient": false,"transactionVI": false,"auxiliaireRestaurant": false,
        "zeroExclus": false
      }
    }
  }
}
</script>

<style scoped>

.place-icons {
  margin-top: 10px;
  float: left;
}

ol {
  list-style: none;
}
</style>