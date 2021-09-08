<template>
  <div>
    <button :disabled="isModifying===true" class="btn blue" @click="AddFormTdd2x">+2</button>
    <button :disabled="isModifying===true" class="btn blue" @click="AddFormTdd">+</button>
    <b>{{ tdd_nbr }}</b>
    <button :disabled="isModifying===true" class="btn blue" @click="RemoveFormTdd">-</button>
    <button :disabled="isModifying===true" class="btn blue" @click="RemoveFormTdd2x">-2</button>
  </div>
  <div v-if="traiteurModif != null && traiteurModif.length > 0">
    <ul>
      <li id="traiteurListe" v-for="(tdd, index) in traiteurModif" :key="tdd">
        <button :id="'ButtonTddModify' + index" class="btn orange" @click="disabledButton('ButtonTddModify' + index); tdd_nbr = 0;
        isModifying = false; modifyTabs=listOfFillTabs(traiteurModif[index]); indexes = index; hasClickedOnce = false">{{ tdd.libelle }} | {{ tdd.codeJournal }} | {{ tdd.direction }} | {{ tdd.compte }}</button>
        <div v-if="idButtonModify === ('ButtonTddModify' + index)">
          <button class="btn red" @click="deleteTraiteur(index); isModifying = false; idButtonModify = ''">Supprimer</button>
          <button v-if="!hasClickedOnce" class="btn blue" @click="modifyContent(index); hasClickedOnce = true; tdd_nbr = 1">Modifier</button>
        </div>
      </li>
    </ul>
  </div>
  <div v-if="tdd_nbr >= values.min">
    <div v-for="(number, main_index) in parseInt(tdd_nbr)" :key="parseInt(number)">
      <form @submit.prevent="" class="top">
        <ol>
          <li v-for="item in ints" :key="item">
            <div :id="item + main_index" class="col-25"><label>{{ item }}</label></div>
            <div class="col-75"><input type="number" :min="0" v-model.number="to_complete[main_index][item]"></div>
          </li>
        </ol>
        <ol>
          <li v-for="item in string" :key="item">
            <div :id="item" class="col-25"><label>{{ item }}</label></div>
            <div :id="item + 'input'" class="col-75">
              <input type="text" v-model="to_complete[main_index][item]" maxlength="30"></div>
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
                <select id="localisation" class="select-css top" v-model="to_complete[main_index][item]" multiple>
                  <option :value="e" v-for="e in LOCALISATION" :key="e">{{ e }}</option>
                </select>
              </div>
              <div v-else-if="item === 'documents'">
                <select id="document" class="select-css top" v-model="to_complete[main_index][item]" multiple>
                  <option :value="e" v-for="e in DOCUMENT" :key="e">{{ e }}</option>
                </select>
              </div>
              <div v-else>
                <input v-if="tabNumber.includes(item)" type="number" v-model.number="to_push[main_index][item]">
                <input v-else type="text" v-model="to_push[main_index][item]">
                <button class="btn green" @click="addElement(main_index, item, to_push[main_index][item])"
                        :disabled="to_push[main_index][item].length < 1">Ajouter</button>
              </div>
            </div>
          </li>
        </ol>
      </form>
    </div>
  </div>
  <button class="btn green" @click="SubmitForm">Valider TraiteurConfig</button>
  <p class="error-message">Cliquer sur <u>valider TraiteurConfig</u> ou les données ne seront pas sauvegardé.</p>
  <form v-if="hasClickedOnce" @submit.prevent="">
    <b>Cliquer pour éditer les tableaux</b>
    <div>
      <button class="btn orange" v-for="item in modifyTabs" :key="item" @click="deleteTabs=listItemTabs(item); tabName=item">{{item}}</button>
    </div>
    <div v-if="deleteTabs != null">
      <b>Cliquez sur un élément pour le supprimer</b><br>
      <button class="btn orange" v-for="(item, index) in deleteTabs" :key="item" @click="deleteItemTabs(index)">{{item}}</button>
    </div>
  </form>
</template>

<script>
export default {
  created() {
    if (this.traiteurModif != null) this.isModify = true;
  },
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
      hasClickedOnce: false,
      isModifying: false,
      idButtonModify: '',
      modifyTdd: [],
      isModify: false,
      modifyTabs: [],
      modifyClick: false,
      deleteTabs: null,
      tabName: '',
      indexes: -1,
      traiteurModif: this.traiteurModification,
      values: {min: 0},
      tdd_nbr: 0,
      tdd: [],
      rsd: ['recuperation', 'specialite', 'direction'],
      select: [],
      ints: ['codeJournal', 'compte', 'ordre'],
      bools: ['auxiliaireRestaurant', 'auxiliaireVide', 'auxilliaireCreditClient', 'compteAnalytique1TVA', 'matriculeRestaurant', 'modeER', 'taxe', 'transactionVI', 'zeroExclus', 'transactionESP', 'transactionCBD'],
      to_push: [],
      array: {
        filtration: {
          FAMILLE: 'familles',
          SOUSFAMILLE: 'sousfamilles',
          GROUPE: 'groupes',
          LIBELLE: 'libelles',
          NUMERO: 'numeros',
          TAG_CONTAINS: 'tags',
          TVAS: 'tvas',
          RULES: 'rules',
          DOCUMENT: 'documents',
          LOCALISATION: 'localisations',
          PROFIT: 'profits',
          COMPTE: 'comptes'
        },
        comptes: [],
        rules: [],
        numeros: [],
        tvas: [],
        documents: [],
        familles: [],
        groupes: [],
        libelles: [],
        localisations: [],
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
      DOCUMENT: ['COMMANDE', 'TICKET', 'RECU_PRELEVEMENT', 'RECU_SESSION_OUVERTE', 'RECU_FIN_SESSION', 'FACTURE', 'NOTE', 'RECU_FIN_SESSION_DECLARE', 'RECU_PRELEVEMENT_DECLARE', 'RECU_REPRISE_SESSION', 'RECU_FIN_SESSION_ANNULEE', 'BON_DEPENSE', 'BON_RECETTE', 'BON_EQUILLIBRE', 'CLOTURE_REGLEMENT', 'TABLE', 'COMPTE', 'COMPTECOMMANDE', 'DUPLICATA', 'RECU_TRANSFERT', 'RECU_REGLEMENT_EMPLOYE', 'RECU_RAZ_COMPTE', 'CLOTURE_EXERCICE', 'RECU_EXPORT', 'TEST', 'REPAS_COMPLET', 'DOCUMENT'],
      tabNumber: ['comptes', 'rules', 'numeros'],
      FormTdd: {tdd: []}
    }
  },
  methods: {
    SubmitForm() {
      if (this.modifyTdd.length !== 0) {
        this.to_complete = []
        for (const fill of this.modifyTdd) {
          fill.obj.filtration = this.listOfFillTabs(fill.obj);
          this.traiteurModif[fill.index] = fill.obj;
        }
      }
      else {
        for (const complete of this.to_complete) {
          try {
            complete.filtration = this.listOfFillTabs(complete);
          } catch (e) {
            continue;
          }
          for (let i = 1; i !== 3; i++) {
            const text = 'compteAnalytique' + i;
            if (typeof complete[text] === 'string' && complete[text].length === 0) complete[text] = null;
          }
        }
      }
      this.FormTdd.tdd = this.to_complete;
      this.$emit('tdd_form', {tdd: this.FormTdd.tdd, modify: this.isModify});
      this.tdd_nbr = 0;
      this.FormTdd.tdd = [];
    },
    addElement(main_index, index, text) {
      if (this.to_push[main_index][index].length > 0 || this.to_push[main_index][index] > 0) {
        this.to_complete[main_index][index].push(text);
        this.to_push[main_index][index] = '';
      }
    },
    ToComplete() {
      this.to_complete.push({
        auxiliaire: null,
        compteAnalytique1: null,
        compteAnalytique2: null,
        compteAnalytique3: null,
        tax_code: null,
        ordre: 1,
        codeJournal: 10,
        compte: 7000000,
        comptes: [],
        rules: [],
        documents: [],
        familles: [],
        filtration: [],
        groupes: [],
        libelles: [],
        localisations: [],
        tvas: [],
        numeros: [],
        profits: [],
        sousfamilles: [],
        tags: [],
        recuperation: 'TOTAL',
        specialite: 'ARTICLE',
        direction: 'CREDIT',
        type: '1',
        libelle: '',
        transaction: "",
        taxe: false,
        matriculeRestaurant: false,
        modeER: true,
        compteAnalytique1TVA: false,
        auxiliaireVide: true,
        auxilliaireCreditClient: false,
        transactionVI: false,
        auxiliaireRestaurant: false,
        zeroExclus: false,
        transactionESP: false,
        transactionCBD: false
      })
    },
    ToPush() {
      this.to_push.push({
        familles: '',
        groupes: '',
        sousfamilles: '',
        numeros: 0,
        libelles: '',
        tags: '',
        documents: '',
        localisations: '',
        profits: '',
        comptes: 0,
        tvas: '',
        rules: 0
      });
    },
    AddFormTdd() {
      this.ToComplete();
      this.ToPush();
      this.tdd_nbr++;
    },
    AddFormTdd2x() {
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
    modifyContent(index) {
      this.isModifying = true;
      const obj = Object.assign({}, this.traiteurModif[index]);
      this.to_complete[0] = obj;
      this.AddFormTdd();
      this.modifyTdd.push({index: index, obj: obj, len: this.to_complete.length-1});
    },
    deleteTraiteur(index) {
      this.traiteurModif.splice(index, 1);
    },
    listOfFillTabs(tdd) {
      const list = [];
      for (const value in this.array.filtration) {
        try {
          if (tdd[this.array.filtration[value]].length > 0) {
            list.push(this.array.filtration[value])
          }
        }
        catch (e) {
          continue;
        }
        console.log()
      }
      return list;
    },
    listItemTabs(item) {
      const list = [];
      for (const obj of this.traiteurModif[this.indexes][item]) {
        list.push(obj);
      }
      return list;
    },
    disabledButton(id) {
      this.to_complete = [];
      const current = id;
      if (this.idButtonModify.length === 0) {
        this.idButtonModify = current;
        const doc = document.getElementById(this.idButtonModify);
        if (doc == null) return;
        // @ts-ignore
        doc.disabled = true;
      } else {
        const doc_old = document.getElementById(this.idButtonModify);
        this.idButtonModify = current;
        const doc_current = document.getElementById(current);
        if (doc_current == null) {
          console.error('Une erreur est survenue.')
          return;
        }
        if (doc_old) {
          // @ts-ignore
          doc_old.disabled = false;
        }
        // @ts-ignore
        doc_current.disabled = true;
      }
    },
    deleteItemTabs(id) {
      this.traiteurModif[this.indexes][this.tabName].splice(id, 1)
      this.deleteTabs = this.listItemTabs(this.tabName);
      for (const c of this.traiteurModif) {
        c.filtration = this.listOfFillTabs(c);
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
  color: black;
}

.top {
  margin-top: 2em;
}

#localisation {
  width: auto;
  margin-right: 50px;
}

#buttons li {
  float: left;
  list-style: none;
  text-align: center;
  background-color: #000000;
  margin-right: 30px;
  width: 150px;
  line-height: 60px;
}

#traiteurListe {
  text-align: left;
}

.indentButton {
  text-align: right;
  display: inline;
}

</style>

<!--TODO: Pour les traiteurConfig, afficher en petit les termes suivants : (libelle codeJournal direction compte),
TODO: si bouton cliqué, affiché le TraiteurConfig, pensé à ajouter une suppression au niveau des tableaux -->