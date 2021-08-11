<template>
  <button class="hover-item" @click="isModifyContent" v-if="traiteurModif!=null">ok</button>
  <button class="hover-item" @click="AddFormTdd2x">×2</button>
  <button class="hover-item" @click="AddFormTdd">+</button>
  <b>{{ tdd_nbr }}</b>
  <button class="hover-item" @click="RemoveFormTdd">-</button>
  <button class="hover-item" @click="RemoveFormTdd2x">-×2</button>
  <p v-if="tdd_nbr < values.min || tdd_nbr > values.max" class="error-message">Le TraiteurConfig doit être compris entre
    {{ values.min }} et {{ values.max }}</p>
  <div v-if="tdd_nbr >= values.min && tdd_nbr <= values.max">
    <div v-for="(number, main_index) in parseInt(tdd_nbr)" :key="parseInt(number)">
      <form @submit.prevent="" class="top">
        <ol>
          <li v-for="item in ints" :key="item">
            <div :id="item + main_index" :class="{'col-25': true, red: item==='id'}"><label>{{ item }}</label></div>
            <div class="col-75"><input type="number" min="0" v-model.number="to_complete[main_index][item]"></div>
          </li>
        </ol>
        <ol>
          <li v-for="item in string" :key="item">
            <div :id="item" :class="{'col-25': true}"><label>{{ item }}</label></div>
            <div :id="item + 'input'"
                 :class="{'col-75': true, 'libelleinput-even': item==='libelle'&&(select.length%2===0||main_index===0), 'libelleinput-odd': select.length%2===1&&item==='libelle'&&main_index>0}">
              <input type="text" v-model="to_complete[main_index][item]"></div>
          </li>
        </ol>
        <ol>
          <li v-for="item in rsd" :key="item">
            <select :id="item+'input'" class="select-css top" v-model="to_complete[main_index][item]">
              <option :value="values" v-for="values in array[item]" :key="values">{{ values }}</option>
            </select>
            <label :for="item"><b>{{ item }}</b></label>
          </li>
        </ol>
        <div class="container0 place-icons">
          <ul class="ks-cboxtags">
            <li v-for="item in bools" :key="item">
              <input :id="item + main_index" type="checkbox" v-model="to_complete[main_index][item]">
              <label :for="item + main_index">{{ item }}</label>
            </li>
          </ul>
        </div>
        <div>
          <select class="select-css" id="select" v-model="select" multiple>
            <option :value="value" v-for="(value, item) in array['filtration']" :key="item">{{ item }}</option>
          </select>
        </div>
        <ol>
          <li v-for="item in select" :key="item">
            <div class="col-25">{{ item }}</div>
            <div class="col-75">
              <div v-if="item === 'localisations'">
                <select id="localisation" class="select-css" v-model="to_complete[main_index][item]" multiple>
                  <option :value="e" v-for="e in LOCALISATION" :key="e">{{ e }}</option>
                </select>
              </div>
              <div v-else>
                <input type="text" v-model="to_push[main_index][item]">
                <button class="hover-item" @click="addElement(main_index, item, to_push[main_index][item])"
                        :disabled="to_push[main_index][item].length < 1">Ajouter
                </button>
              </div>
            </div>
          </li>
        </ol>
      </form>
    </div>
    <button class="hover-item" @click="SubmitForm">Valider TraiteurConfig</button>
    <p class="error-message"><u>Cliquer sur 'valider TraiteurConfig' ou les données ne seront pas sauvegardé dans la
      société.</u></p>
  </div>
</template>

<script>
export default {
  emits: ['tdd_form'],
  name: "TddForm",
  props: {
    traiteurModification: {
      default: null,
      required: false,
    }
  },
  data() {
    return {
      traiteurModif: this.traiteurModification,
      values: {min: 1, max: 30},
      tdd_nbr: 0,
      tdd: [],
      rsd: ['recuperation', 'specialite', 'direction'],
      select: [],
      ints: ['id', 'codeJournal', 'compte', 'ordre'],
      bools: ['auxiliaireRestaurant', 'auxiliaireVide', 'auxilliaireCreditClient', 'compteAnalytique1TVA', 'matriculeRestaurant', 'modeER', 'taxe', 'transactionVI', 'zeroExclus'],
      to_push: [],
      array: {
        filtration: {
          FAMILLE: 'familles',
          GROUPE: 'groupes',
          SOUSFAMILLE: 'sousfamilles',
          NUMERO: 'numeros',
          LIBELLE: 'libelles',
          TAG_CONTAINS: 'tags',
          TVAS: 'tvas',
          DOCUMENT: 'documents',
          LOCALISATION: 'localisations',
          PROFIT: 'profits',
          COMPTE: 'comptes',
          RULES: '?????' //TODO: VERIFIER ICI A QUOI CORRESPOND RULES
        },
        comptes: [],
        tvas: [],
        documents: [],
        familles: [],
        groupes: [],
        libelles: [],
        localisations: [],
        numeros: [],
        profits: [],
        sousfamilles: [],
        tags: [],
        direction: ['DEBIT', 'CREDIT'],
        recuperation: ['QUANTITE', 'UNITAIRE', 'TOTAL', 'HT', 'TVA', 'SERVICE', 'REEL', 'THEORIQUE', 'DELTA', 'MONTANT0', 'MONTANT1', 'MONTANT2'],
        specialite: ['ARTICLE', 'TVA', 'STATISTIQUE', 'OFFERT', 'TIROIR_PREFERMENT', 'REGLEMENT', 'TIROIR_REGLEMENT', 'RECU', 'DESACTIVE', 'TICKET', 'TIROIR_REMISE']
      },
      string: ["auxiliaire", "compteAnalytique1", "compteAnalytique2", "compteAnalytique3", "tax_code", "transaction", 'libelle'],
      to_complete: [],
      LOCALISATION: ['EAT_IN', 'TAKE_OUT', 'DRIVE_THROUGH', 'DELIVERY', 'PICKUP', 'KIOSK_EAT_IN', 'KIOSK_TAKE_OUT', 'SALLE', 'SALLE_EAT_IN', 'SALLE_TAKE_OUT', 'EXTERIEUR', 'PARKING'],
      FormTdd: {tdd: []}
    }
  },
  methods: {
    SubmitForm() {
      this.FormTdd.tdd = this.to_complete;
      this.$emit('tdd_form', this.FormTdd.tdd);
      this.FormTdd.tdd = [];
    },
    addElement(main_index, index, text) {
      if (this.to_push[main_index][index].length > 0) {
        this.to_complete[main_index][index].push(text);
        this.to_push[main_index][index] = ''
      }
    },
    ToComplete() {
      this.to_complete.push({
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
        "documents": [],
        "familles": [],
        "filtration": [],
        "groupes": [],
        "libelles": [],
        "localisations": [],
        "tvas": [],
        "numeros": [],
        "profits": [],
        "sousfamilles": [],
        "tags": [],
        "recuperation": '',
        "specialite": '',
        "direction": '',
        "type": '1',
        "libelle": '',
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
      })
    },
    ToPush() {
      this.to_push.push({
        familles: '',
        groupes: '',
        sousfamilles: '',
        numeros: '',
        libelles: '',
        tags: '',
        documents: '',
        localisations: '',
        profits: '',
        comptes: '',
        tvas: '',
        rules: ''
      });
    },
    AddFormTdd() {
      if (this.tdd_nbr >= this.values.max) return;
      this.ToComplete();
      this.ToPush();
      this.tdd_nbr++;
    },
    AddFormTdd2x() {
      if (this.tdd_nbr + 2 > this.values.max) {
        this.AddFormTdd();
        return;
      }
      this.ToComplete();
      this.ToComplete();
      this.ToPush();
      this.ToPush();
      this.tdd_nbr += 2;
    },
    RemoveFormTdd() {
      if (this.tdd_nbr <= this.values.min) return;
      this.to_complete.pop();
      this.to_push.pop();
      this.tdd_nbr--;
    },
    RemoveFormTdd2x() {
      if (this.tdd_nbr - 2 < this.values.min) {
        this.RemoveFormTdd();
        return;
      }
      this.to_complete.pop();
      this.to_complete.pop();
      this.to_push.pop();
      this.to_push.pop();
      this.tdd_nbr -= 2;
    },
    isModifyContent() {
      if (this.traiteurModif != null) {
        const len = this.traiteurModif.length;
        for (let i = 0; i < len; i++) {
          this.AddFormTdd();
          this.to_complete[i] = this.traiteurModif[i];
        }
      } else {
        alert('Erreur: problème sur le TraiteurConfig')
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

b {
  margin-left: 5px;
}

#zeroExclus {
  margin-bottom: 20px;
}

.top {
  margin-top: 2em;
}

.libelleinput-odd {
  margin-right: fill;
}

.libelleinput-even {
  margin-right: 50em;
  position: center;
}

#localisation {
  width: auto;
  margin-right: 50px;
}

.red {
  color: red;
  font-weight: bold;
}

</style>