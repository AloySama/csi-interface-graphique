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
            <li v-for="item in ints" :key="item">
              <div :id="item"  class="col-25"><label>{{item}}</label></div>
              <div class="col-75">
                <input type="number" min="0" v-model.number="to_complete[item]">
              </div>
            </li>
          </ol>
          <ol>
            <li v-for="item in string" :key="item">
              <div :id="item" class="col-25"><label>{{item}}</label></div>
              <div class="col-75">
                <input type="text" v-model="to_complete[item]">
              </div>
            </li>
          </ol>
          <ol>
            <li v-for="item in bools" :key="item">
              <div class="col-25">{{item}}</div>
              <div class="col-75">
                <input class="place-icons" type="checkbox" v-model="to_complete[item]">
              </div>
            </li>
          </ol>
          <div>
            <select v-model="select" multiple>
              <option :value="_" v-for="(_, item) in array['filtration']" :key="item">{{item}}</option>
            </select>
          </div>
          <ol>
            <li v-for="item in select" :key="item">
              <div class="col-25">{{item}}</div>
              <div class="col-75">
                <input type="text" v-model="to_push[item]"> <!-- TODO: créer un bouton pour chaque input qui permettra de push l'input dans l'array | Créer un tableau qui aura tous les inputs de chaque élément. -->
                <button class="hover-item" @click="AddElement(item, to_push[item])" :disabled="to_push[item].length < 1">Ajouter</button>
              </div>
            </li>
          </ol>
        </form>
      </div>
      <button class="hover-item" @click="SubmitForm" >Valider TDD</button>
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
      tdd_nbr: 1,
      tdd: [],
      select: [],
      ints: ['id', 'codeJournal', 'compte', 'ordre'],
      bools: ['auxiliaireRestaurant', 'auxiliaireVide', 'auxilliaireCreditClient',
        'compteAnalytique1TVA', 'matriculeRestaurant', 'modeER', 'taxe', 'transactionVI', 'zeroExclus'],
      to_push: {
        familles: '',
        groupes: '',
        sousfamilles: '',
        numeros: '',
        libelle: '',
        tags: '',
        documents: '',
        localisations: '',
        profits: '',
        comptes: ''
      },
      array: {
        'filtration': {
          'FAMILLE': 'familles',
          'GROUPE': 'groupes',
          'SOUSFAMILLE': 'sousfamilles',
          'NUMERO': 'numeros',
          'LIBELLE': 'libelle',
          'TAG_CONTAINS': 'tags',
          'TVAS': 'tvas',
          'DOCUMENT': 'documents',
          'LOCALISATION': 'localisations',
          'PROFIT': 'profits',
          'COMPTE': 'comptes',
          'RULES': '?????' //TODO: VERIFIER ICI A QUOI CORRESPOND RULES
        },
        'comptes': [],
        'documents': [],
        'familles': [],
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
        'specialite': ['ARTICLE', 'TVA', 'STATISTIQUE', 'OFFERT', 'TIROIR_PREFERMENT', 'REGLEMENT', 'TIROIR_REGLEMENT', 'RECU', 'DESACTIVE', 'TICKET', 'TIROIR_REMISE']
      },
      string: ["auxiliaire", "compteAnalytique1", "compteAnalytique2", "compteAnalytique3", "tax_code", "transaction"],
      to_complete: {
        "auxiliaire": null,
        "compteAnalytique1": null,
        "compteAnalytique2": null,
        "compteAnalytique3": null,
        "tax_code": null,
        "id": 1,
        "ordre": 0,
        "codeJournal": 0,
        "compte": 0,
        "comptes": [],
        "direction": [],
        "documents": [],
        "familles": [],
        "filtration": [],
        "groupes": [],
        "libelles": [],
        "localisations": [],
        "tvas": [],
        "numeros": [],
        "profits": [],
        "recuperation": [],
        "sousfamilles": [],
        "specialite": [],
        "tags": [],
        "type": "1",
        "libelle": "",
        "transaction": "VI",
        "taxe": false,
        "matriculeRestaurant": false,
        "modeER": true,
        "compteAnalytique1TVA": false,
        "auxiliaireVide": false,
        "auxilliaireCreditClient": false,
        "transactionVI": false,
        "auxiliaireRestaurant": false,
        "zeroExclus": false
      },
      FormTdd: {tdd:[]}
    }
  },
  methods: {
    SubmitForm() {
      this.FormTdd.tdd = this.to_complete;
      this.$emit('tdd_form', this.FormTdd);
    },
    AddElement(index, text) {
      if (this.to_push[index].length !== 0) {
        this.to_complete[index].push(text);
        this.to_push[index] = ''
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