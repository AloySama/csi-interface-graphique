<template>
  <div>
    <strong>Nombre : automatique si non renseigné ou 0 en fonction de la case.
      Sinon null, false ou tableau vide si non renseigné</strong><br>
    <p v-if="tdd_nbr < values.min || tdd_nbr > values.max" class="error-message">Le nombre doit être compris entre {{values.min}} et {{values.max}}</p>
    <!--<input v-model="tdd_nbr" type="number" :min="values.min" :max="values.max" placeholder="Entrer un nombre ici">-->
    <button class="hover-item" @click="AddFormTdd">+</button> <b>{{tdd_nbr}}</b><button class="hover-item" @click="RemoveFormTdd">-</button>
    <div v-if="tdd_nbr >= values.min && tdd_nbr <= values.max">
      <div v-for="(number, main_index) in parseInt(tdd_nbr)" :key="parseInt(number)">
        <form @submit.prevent="">
          <ol>
            <li v-for="item in ints" :key="item">
              <div :id="item"  class="col-25"><label>{{item}}</label></div>
              <div class="col-75"><input type="number" min="0" v-model.number="to_complete[main_index][item]"></div>
            </li>
          </ol>
          <ol>
            <li v-for="item in string" :key="item">
              <div :id="item" class="col-25"><label>{{item}}</label></div>
              <div class="col-75"><input type="text" v-model="to_complete[main_index][item]"></div>
            </li>
          </ol>
          <ol>
            <li v-for="item in bools" :key="item">
              <div class="col-25">{{item}}</div>
              <div class="col-75"><input class="place-icons" type="checkbox" v-model="to_complete[main_index][item]"></div>
            </li>
          </ol>
          <div v-for="item in rsd" :key="item">
            <div class="col-25"><label :for="item"><b>{{item}}</b></label></div>
            <div><select :id="item" v-model="to_complete[item]">
              <option :value="values" v-for="values in array[item]" :key="values">{{values}}</option>
            </select></div>
          </div>
          <div>
            <label for="select" class="col-25">Choisir</label>
            <select id="select" v-model="select" multiple>
              <option :value="value" v-for="(value, item) in array['filtration']" :key="item">{{item}}</option>
            </select>
          </div>
          <ol>
            <li v-for="item in select" :key="item">
              <div class="col-25">{{item}}</div>
              <div class="col-75">
                <div id="localisation" v-if="item === 'localisations'">
                  <select v-model="to_complete[main_index][item]" multiple>
                    <option :value="e" v-for="e in LOCALISATION" :key="e">{{e}}</option>
                  </select>
                </div>
                <div v-else>
                  <input type="text" v-model="to_push[main_index][item]">
                  <button class="hover-item" @click="AddElement(main_index, item, to_push[main_index][item])" :disabled="to_push[main_index][item].length < 1">Ajouter</button>
                </div>
              </div>
            </li>
          </ol>
        </form>
      </div>
      <button class="hover-item" @click="SubmitForm" >Valider TraiteurConfig</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['tdd_form'],
  name: "TddForm",
  data() {
    return {
      values: {min: 1, max: 30},
      tdd_nbr: 0,
      tdd: [],
      rsd : ['recuperation', 'specialite', 'direction'],
      select: [],
      ints: ['id', 'codeJournal', 'compte', 'ordre'],
      bools: ['auxiliaireRestaurant', 'auxiliaireVide', 'auxilliaireCreditClient', 'compteAnalytique1TVA', 'matriculeRestaurant', 'modeER', 'taxe', 'transactionVI', 'zeroExclus'],
      to_push: [],
      array: {
        'filtration': {
          'FAMILLE': 'familles',
          'GROUPE': 'groupes',
          'SOUSFAMILLE': 'sousfamilles',
          'NUMERO': 'numeros',
          'LIBELLE': 'libelles',
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
      string: ["auxiliaire", "compteAnalytique1", "compteAnalytique2", "compteAnalytique3", "tax_code", "transaction", 'libelle'],
      to_complete: [],
      LOCALISATION: ['EAT_IN', 'TAKE_OUT', 'DRIVE_THROUGH', 'DELIVERY', 'PICKUP', 'KIOSK_EAT_IN', 'KIOSK_TAKE_OUT', 'SALLE', 'SALLE_EAT_IN', 'SALLE_TAKE_OUT', 'EXTERIEUR', 'PARKING'],
      FormTdd: {tdd:[]}
    }
  },
  methods: {
    SubmitForm() {
      this.FormTdd.tdd = this.to_complete;
      this.$emit('tdd_form', this.FormTdd);
    },
    AddElement(main_index, index ,text) {
      if (this.to_push[main_index][index].length > 0) {
        this.to_complete[main_index][index].push(text);
        this.to_push[main_index][index] = ''
      }
    },
    ToComplete() {
      this.to_complete.push({"auxiliaire": null, "compteAnalytique1": null, "compteAnalytique2": null, "compteAnalytique3": null,
        "tax_code": null, "id": 1, "ordre": 0, "codeJournal": 0, "compte": 0, "comptes": [], "documents": [],
        "familles": [], "filtration": [], "groupes": [], "libelles": [], "localisations": [], "tvas": [], "numeros": [],
        "profits": [], "sousfamilles": [], "tags": [], "recuperation": '', "specialite": '', "direction": '', "type": '1',
        "libelle": '', "transaction": "VI", "taxe": false, "matriculeRestaurant": false, "modeER": true,
        "compteAnalytique1TVA": false, "auxiliaireVide": false, "auxilliaireCreditClient": false,
        "transactionVI": false, "auxiliaireRestaurant": false, "zeroExclus": false})
    },
    ToPush() {
      this.to_push.push({familles: '', groupes: '', sousfamilles: '', numeros: '', libelles: '', tags: '', documents: '', localisations: '', profits: '', comptes: ''});
    },
    AddFormTdd() {
      if (this.tdd_nbr >= this.values.max) return;
      this.ToComplete();
      this.ToPush();
      this.tdd_nbr++;
    },
    RemoveFormTdd() {
      if (this.tdd_nbr <= this.values.min) return;
      this.to_complete.pop();
      this.to_push.pop();
      this.tdd_nbr--;
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

b {
  margin-left: 5px;
}
</style>
