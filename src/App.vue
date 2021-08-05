<template>
  <div class="app">
    <header>
      <div class="title">
        <a href="https://www.cashsystemes.eu/"><img :src="img" alt="logo CSI"
                                                    title="https://www.cashsystemes.eu/"></a>
        <h1>ARCOLE<br>export</h1>
      </div>
      <div class="order">
        <button id="edit" :title="message['edit']" class="hover-item"
                @click="bool.editing=true; disabledButtons('edit', 'old_edit', true);"
                :disabled="json==null">Éditer ficher ARCOLE</button>
        <button id="modify" class="hover-item" :title="message['modify']" :disabled="json==null" @click="bool.Modify = true; disabledButtons('modify', 'old_edit', true)">Modifier éléments</button>
        <button class="hover-item" @click="DownloadFile" :disabled="json==null" :title="message['save']">Enregistrer</button>
        <button id="parcourir" :title="message['parcours']" class="hover-item"
                @click="bool.ChooseFile=true; disabledButtons('parcourir', 'old_edit', true);">Charger un fichier</button>
        <button id="remove" :title="message['remove']" class="hover-item"
                @click="bool.RemoveElement=true; disabledButtons('remove', 'old_edit', true)"
                :disabled="json==null" >Supprimer éléments</button>
        <button id="retour" :title="message['retour']" class="hover-item" v-if="bool.editing || bool.ChooseFile || bool.RemoveElement || bool.Modify"
        @click="
        doEdit(false, ['edit', 'parcourir', 'remove', 'modify']);
        updateButtons(null)
        bool.ChooseFile = false; bool.RemoveElement = false">Retour</button>
      </div>
    </header>
  </div>
  <template v-if="bool.editing">
    <button id="AddSoc" class="hover-item"
            @click="bool.edit_societe = true; disabledButtons('AddSoc', 'old', false)
            ">Ajouter une société</button>
    <button id="AddEta" class="hover-item"
            @click="bool.edit_eta = true; disabledButtons('AddEta', 'old', false)
            ">Ajouter un établissement</button>
    <button id="AddRes" class="hover-item" @click="bool.edit_res = true;  disabledButtons('AddRes', 'old', false)">Ajouter une restaurant</button>
    <button v-if="bool.edit_societe || bool.edit_eta || bool.edit_res" class="hover-item" @click="
                                                                updateButtons(null)
                                                                doEdit( false, ['AddSoc', 'AddRes', 'AddEta']);"
    >Retour</button></template>
  <modify-element v-if="bool.Modify"></modify-element>
  <SocieteForm :json-file="json" v-if="bool.edit_societe && bool.editing" @json_value="SetJson"/>
  <EtablissementForm :json-file="json" v-if="bool.edit_eta && bool.editing" @edit_value="SetEta" @json_value="SetJson"></EtablissementForm>
  <RestaurantForm :json-file="json" v-if="bool.edit_res && bool.editing" @edit_value="SetRes"/>
  <UploadFiles v-if="bool.ChooseFile" @upload-json="SetJson"/>
  <RemoveElements v-if="bool.RemoveElement" :json-file="json"></RemoveElements>
  <Footer @setting_value="SetSettings"></Footer>
</template>

<script lang="ts">
/* eslint-disable */
import {defineComponent} from "vue";
import SocieteForm from "@/components/SocieteForm.vue";
import EtablissementForm from "@/components/EtablissementForm.vue";
import UploadFiles from "@/components/UploadFiles.vue";
import RestaurantForm from "@/components/RestaurantForm.vue";
import download from '@/functions/Savedata'
import Footer from "@/components/footer.vue";
import RemoveElements from "@/components/RemoveElements.vue";
import TabType from "@/functions/TabType";
import ModifyElement from "@/components/ModifyElement.vue";

export default defineComponent({
  name: 'App',
  components: {ModifyElement, RemoveElements, Footer, RestaurantForm, UploadFiles, EtablissementForm, SocieteForm},
  data() {
    return {
      setting_tab: {},
      img: require('@/assets/images/csi.png'),
      json: null,
      bool: {
        RemoveElement: false,
        Modify: false,
        ChooseFile: false,
        editing: false,
        edit_eta: false,
        edit_societe: false,
        edit_res: false,
      },
      tab: {old: "", old_edit: "", delete: ""},
      message: {
        'edit': 'Cliquer sur moi pour commencer à éditer le fichier',
        'retour': 'Quitte l\'édition',
        'parcours': 'Parcourir un fichier sur le pc',
        'save': 'Enregistrer le fichier sur votre pc',
        'remove': 'Supprimer un élément dans le fichier',
        'modify': 'Modifier des éléments déjà présent'
      },
      download
    }
  },
  methods: {
    SetSettings(setting: []) {
      this.setting_tab = setting
    },
    DownloadFile() {
      download(this.json, 'arcole.json', this.setting_tab)
    },
    SetEta(value: boolean) {

      this.doEdit(value, ['AddEta']);
      this.bool.edit_eta = value;
    },
    SetRes(value: boolean) {
      this.doEdit(value, ['AddRes']);
      this.bool.edit_res = value;
    },
    SetJson(json: string) {
      if (json != null) {
        try {
          if (typeof json != 'object') this.json = JSON.parse(json);
        else this.json = json;
        }
        catch (error) {
          alert('Erreur sur le Json !')
          console.error("Erreur: le ficher json envoyé n'est pas bien structuré : json mit à null")
          this.json = null;
        }
      }
      else alert("Le json est null !");
    },
    doEdit(editing: boolean, ids: string[]) {
      for (const id of ids) {
        if (id !== 'parcourir') if (this.json == null) continue;
        const d = document.getElementById(id);
        if (d == null) continue;
        // @ts-ignore
        d.disabled = editing;
      }
    },
    disabledButtons(id: string, tab_str: TabType, mainbutton: boolean) {
      const current = id;
      if (this.tab[tab_str].length === 0) {
          this.tab[tab_str] = current;
          const doc = document.getElementById(this.tab[tab_str]);
          if (doc == null) return;
          // @ts-ignore
          doc.disabled = true;
      }
      else {
        const doc_old = document.getElementById(this.tab[tab_str]);
        this.tab[tab_str] = current;
        const doc_current = document.getElementById(current);
        if (doc_current == null) {
          console.error('Une erreur est survenue.')
          return;
        }
        if (doc_old != null) {
          // @ts-ignore
          doc_old.disabled = false;
        }
        // @ts-ignore
        doc_current.disabled = true;
        if (!mainbutton) this.updateButtons(current);
        else this.UpdateButtonsMain(current);
      }
    },
    updateButtons(current: string) {
      this.bool.edit_eta = 'AddEta' === current;
      this.bool.edit_res = 'AddRes' === current;
      this.bool.edit_societe = 'AddSoc' === current;
      this.bool.Modify = 'modify' === current;
    },
    UpdateButtonsMain(current: string) {
      this.bool.editing = 'edit' === current;
      this.bool.ChooseFile = 'parcourir' === current;
      this.bool.RemoveElement = 'remove' === current;
      this.bool.Modify = 'modify' === current;
    }
  }
});
</script>