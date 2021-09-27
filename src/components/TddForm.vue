<template>
  <div v-if="traiteurModif==null">
    <button :disabled="isModifying===true" class="btn blue" @click="AddFormTdd">+</button>
    <b>{{ tdd_nbr }}</b>
    <button :disabled="isModifying===true" class="btn blue" @click="RemoveFormTdd">-</button>
  </div>
  <div v-if="tdd_nbr >= values.min" class="middle">
    <div v-for="(number, main_index) in parseInt(tdd_nbr)" :key="parseInt(number)">
      <form @submit.prevent="" class="top">
        <ol>
          <li v-for="item in ints" :key="item">
            <div :id="item + main_index" :class="{'col-25': true, 'red-text': to_complete[main_index][item] < 0}">
              <label>{{ item }}</label></div>
            <div class="col-75"><input type="number" :min="0" v-model.number="to_complete[main_index][item]"></div>
          </li>
        </ol>
        <ol>
          <li v-for="item in string" :key="item">
            <div :id="item" class="col-25"><label>{{ item }}</label></div>
            <div :id="item + 'input'" :class="{'col-75': true, 'set-margin': item === 'type'}">
              <input type="text" v-model="to_complete[main_index][item]" maxlength="30"></div>
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
        <ol>
          <li class="left" v-for="item in rsd" :key="item">
            <label :for="item" class="right-margin"><b>{{ item }}</b></label>
            <select :id="item+'input'" class="select-css top" v-model="to_complete[main_index][item]" @change="addForm(item, to_complete[main_index][item])">
              <option :value="values" v-for="values in array[item]" :key="values">{{ values }}</option>
            </select>
          </li>
        </ol>
        <div>
          <select class="select-css" id="select" v-model="select" multiple>
            <option :value="value" v-for="(value, item) in array['filtration']" :key="item">{{ item }}</option>
          </select>
        </div>
        <div v-for="item in ['recuperation', 'specialite', 'direction']" :key="item">
          <input-form :type="'text'"  v-slot="slotProp" v-if="others[item]">{{attribution(slotProp.tab, item, main_index)}} {{item}}</input-form> <!-- revoir  -->
        </div>
        <ol>
          <li v-for="item in select" :key="item">
            <div class="col-25">{{ item }}</div>
            <div :class="{'col-75': true, 'set-margin': select.length % 2 === 1 && item === select[select.length-1]}">
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
                <input v-if="tabNumber.includes(item)" type="number" v-model.number="to_push[main_index][item]" min="0">
                <input v-else type="text" v-model="to_push[main_index][item]">
                <button class="btn green" @click="addElement(main_index, item, to_push[main_index][item]); modifyTab(main_index)"
                        :disabled="to_push[main_index][item].length < 1">Ajouter</button>
              </div>
            </div>
          </li>
        </ol>
        <form @submit.prevent="" v-if="modifyTabs[main_index].length > 0" class="middle">
          <div>
            <button class="btn orange" v-for="key in modifyTabs[main_index]" :key="key" @click="deleteTabs[main_index]=listItemTabs(main_index, key.value); tabName[main_index]=key.value">{{key.key}}</button>
          </div>
          <div v-if="deleteTabs[main_index].length > 0">
            <div v-for="(item, index) in deleteTabs[main_index]" :key="index">
              <button class="btn orange" :id="'TabButton' + index"  @click="tabButtonId = 'TabButton' + index; modifyTabContent = false">{{item}}</button>
              <button class="btn blue" v-if="tabButtonId === 'TabButton' + index" @click="modifyTabContent = !modifyTabContent">modifier</button>
              <button class="btn red" v-if="tabButtonId === 'TabButton' + index" @click="deleteItemTabs(main_index, index)">Supprimer</button>
              <div v-if="modifyTabContent && tabButtonId === 'TabButton' + index">
                <input-form :type="'text'" v-slot="slotProp">{{modifyItemTabs(main_index, index, slotProp.tab)}} Modifier</input-form>
                <input type="submit" @click="to_complete[main_index][tabName[main_index]][index] = editContentTab; deleteTabs[main_index]=listItemTabs(main_index, tabName[main_index]);tabButtonId = ''">
              </div>
            </div>
          </div>
        </form>
      </form>
    </div>
  </div>
  <button class="btn green" @click="SubmitForm" :disabled="tdd_nbr <= 0">Valider TraiteurConfig</button>
  <p class="error-message">Cliquer sur <u>valider TraiteurConfig</u> ou les données ne seront pas sauvegardé.</p>

</template>

<script>
import InputForm from "@/components/FormSlots/InputForm";

export default {
  created() {
    if (this.traiteurModif != null) {
      this.to_complete[0] = Object.assign({}, this.traiteurModif);
      this.to_complete[0] = this.addTab(this.to_complete[0]);
      this.tdd_nbr = 1;
      this.isModify = true;
      this.toPush();
      this.edit = true;
      this.modifyTabs[0] = this.listOfFillTabs(this.to_complete[0], false);
      this.deleteTabs.push([]);
      if (this.modifyTabs[0].length > 0) this.editTab = true;
    }
  },
  components: {InputForm},
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
      others: {
        recuperation: false,
        specialite: false,
        direction: false
      },
      modifyTabContent: false,
      isModifying: false,
      editContentTab: '',
      editTab: false,
      edit: false,
      idButtonModify: '',
      isModify: false,
      modifyTabs: [],
      deleteTabs: [],
      tabName: [],
      traiteurModif: this.traiteurModification,
      values: {min: 0},
      tdd_nbr: 0,
      tdd: [],
      tabButtonId: '',
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
        direction: ['autre ...', 'DEBIT', 'CREDIT'],
        recuperation: ['autre ...', 'QUANTITE', 'UNITAIRE', 'TOTAL', 'HT', 'TVA', 'SERVICE', 'REEL', 'THEORIQUE', 'DELTA', 'MONTANT0', 'MONTANT1', 'MONTANT2'],
        specialite: ['autre ...', 'ARTICLE', 'TVA', 'STATISTIQUE', 'OFFERT', 'TIROIR_PREFERMENT', 'REGLEMENT', 'TIROIR_REGLEMENT', 'RECU', 'DESACTIVE', 'TICKET', 'TIROIR_REMISE']
      },
      string: ["auxiliaire", "compteAnalytique1", "compteAnalytique2", "compteAnalytique3", "tax_code", "transaction", 'libelle', 'type'],
      to_complete: [],
      LOCALISATION: ['EAT_IN', 'TAKE_OUT', 'DRIVE_THROUGH', 'DELIVERY', 'PICKUP', 'KIOSK_EAT_IN', 'KIOSK_TAKE_OUT', 'SALLE', 'SALLE_EAT_IN', 'SALLE_TAKE_OUT', 'EXTERIEUR', 'PARKING'],
      DOCUMENT: ['COMMANDE', 'TICKET', 'RECU_PRELEVEMENT', 'RECU_SESSION_OUVERTE', 'RECU_FIN_SESSION', 'FACTURE', 'NOTE', 'RECU_FIN_SESSION_DECLARE', 'RECU_PRELEVEMENT_DECLARE', 'RECU_REPRISE_SESSION', 'RECU_FIN_SESSION_ANNULEE', 'BON_DEPENSE', 'BON_RECETTE', 'BON_EQUILLIBRE', 'CLOTURE_REGLEMENT', 'TABLE', 'COMPTE', 'COMPTECOMMANDE', 'DUPLICATA', 'RECU_TRANSFERT', 'RECU_REGLEMENT_EMPLOYE', 'RECU_RAZ_COMPTE', 'CLOTURE_EXERCICE', 'RECU_EXPORT', 'TEST', 'REPAS_COMPLET', 'DOCUMENT'],
      tabNumber: ['comptes', 'rules', 'numeros'],
      FormTdd: {tdd: []}
    }
  },
  methods: {
    attribution(value, to_complete, main) {
      this.to_complete[main][to_complete] = value;
      return null;
    },
    modifyTab(index) {
      this.modifyTabs[index] = this.listOfFillTabs(this.to_complete[index], false);
      this.editTab = false;
      setTimeout(() => {this.editTab = true}, 0);
    },
    SubmitForm() {
      if (this.traiteurModif == null) {
        for (const complete of this.to_complete) {
          try {
            complete.filtration = this.listOfFillTabs(complete, true);
          } catch (e) {
            continue;
          }
          for (let i = 1; i !== 3; i++) {
            const text = 'compteAnalytique' + i;
            if (typeof complete[text] === 'string' && complete[text].length === 0) complete[text] = null;
          }
          if (typeof complete.auxiliaire === 'string' && complete.auxiliaire.length === 0) complete.auxiliaire = null;
        }
      }
      else this.to_complete[0].filtration = this.listOfFillTabs(this.to_complete[0], true);
      for (const item of this.to_complete) {
        if (item.recuperation === 'autre ...') item.recuperation = "";
        if (item.specialite === 'autre ...') item.recuperation = "";
        if (item.direction === 'autre ...') item.recuperation = "";
      }
      this.FormTdd.tdd = this.to_complete;
      this.$emit('tdd_form', {tdd: this.FormTdd.tdd, modify: this.isModify});
      this.tdd_nbr = 0;
      this.FormTdd.tdd = [];
    },
    addElement(main_index, index, text) {
      if (this.to_push[main_index][index].length >= 0 || this.to_push[main_index][index] >= 0) {
        try {
          this.to_complete[main_index][index].push(text);
        }
        catch (e) {
          this.to_complete[main_index][index] = [];
          this.to_complete[main_index][index].push(text);
        }
        this.to_push[main_index][index] = '';
      }
    },
    addTab(traiteur) {
      for (const property in this.array.filtration) {
        if (traiteur[this.array.filtration[property]] == null || typeof traiteur[this.array.filtration[property]] === 'undefined')
          traiteur[property] = []
      }
      return traiteur;
    },
    toComplete() {
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
    toPush() {
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
      this.toComplete();
      this.toPush();
      this.tdd_nbr++;
      this.modifyTabs.push([]);
      this.deleteTabs.push([]);
      this.tabName.push([]);
    },
    RemoveFormTdd() {
      if (this.tdd_nbr <= this.values.min) return;
      this.to_complete.pop();
      this.to_push.pop();
      this.tdd_nbr--;
      this.modifyTabs.pop();
      this.deleteTabs.pop();
    },
    listOfFillTabs(tdd, filtration) {
      const list = [];
      console.log(tdd);

      for (const key in this.array.filtration) {
        try {
          if (tdd[this.array.filtration[key]].length > 0 && !filtration) list.push({value: this.array.filtration[key], key: key})
          else if (tdd[this.array.filtration[key]].length > 0) list.push(key)
        }
        catch (e) {
          continue;
        }
        console.log()
      }
      return list;
    },
    listItemTabs(index, item) {
      const list = [];

      for (const obj of this.to_complete[index][item]) list.push(obj);
      return list;
    },
    disabledButton(id) {
      this.to_complete = [];
      const current = id;
      if (this.idButtonModify.length === 0) {
        this.idButtonModify = current;
        const doc = document.getElementById(this.idButtonModify);
        if (doc == null) return;
        doc.disabled = true;
      } else {
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
    deleteItemTabs(main_index, id) {
      this.to_complete[main_index][this.tabName[main_index]].splice(id, 1);
      this.deleteTabs[main_index] = this.listItemTabs(main_index, this.tabName[main_index]);
      this.modifyTabs[main_index] = this.listOfFillTabs(this.to_complete[main_index], false);
      if (this.modifyTabs[main_index].length === 0) this.editTab = false;
    },
    modifyItemTabs(main_index, id, replace_with) {
      this.editContentTab = replace_with;
      return null;
    },
    addForm(rsd, string) {
      this.others[rsd] = string === 'autre ...';
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

.red-text {
  color: red;
}

.set-margin {
  margin-right: 50%;
}

.middle {
  text-align: center;
}

.left {
  margin-left: 70px;
  margin-bottom: 20px;
  float: left;
}

.right-margin {
  margin-right: 10px;
}

</style>