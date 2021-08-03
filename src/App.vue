<template>
  <div class="app">
    <header>
      <div class="title">
        <a href="https://www.cashsystemes.eu/"><img :src="img" alt="logo CSI"
                                                    title="https://www.cashsystemes.eu/"></a>
        <h1>ARCOLE<br>export</h1>
      </div>
      <div class="order">
        <button class="hover-item" @click="DownloadFile" :disabled="json == null" :title="message['save']">Enregistrer</button>
        <button id="edit" :title="message['edit']" class="hover-item"
                @click="editing = true; DisabledButtons('edit', 'old_edit', true);"
                :disabled="json == null">Éditer ficher ARCOLE</button>
        <button id="parcourir" :title="message['parcours']" class="hover-item"
                @click="ChooseFile = true; DisabledButtons('parcourir', 'old_edit', true);">Charger un fichier</button>
        <button id="remove" :title="message['remove']" class="hover-item"
                @click="RemoveElement = true; DisabledButtons('remove', 'old_edit', true)"
                :disabled="json==null" >Supprimer éléments</button>
        <button id="retour" :title="message['retour']" class="hover-item" v-if="editing || ChooseFile || RemoveElement"
        @click="doEdit(true, false, 'edit');
        doEdit(false, false, 'parcourir');
        doEdit(false, false, 'remove')
        UpdateButtons(null)
        ChooseFile = false; RemoveElement = false">Retour</button>
      </div>
    </header>
  </div>
  <template v-if="editing">
    <button id="AddSoc" class="hover-item"
            @click="edit_societe = true; DisabledButtons('AddSoc', 'old', false)
            ">Ajouter une société</button>
    <button id="AddEta" class="hover-item"
            @click="edit_eta = true; DisabledButtons('AddEta', 'old', false)
            ">Ajouter un établissement</button>
    <button id="AddRes" class="hover-item" @click="edit_res = true;  DisabledButtons('AddRes', 'old', false)">Ajouter une restaurant</button>
    <button v-if="edit_societe || edit_eta || edit_res" class="hover-item" @click="
                                                                UpdateButtons(null)
                                                                doEdit(true, false, 'AddSoc');
                                                                doEdit(true, false, 'AddRes');
                                                                doEdit(true, false, 'AddEta');
    doEdit(false, false, 'AddEta');">Retour</button></template>
  <SocieteForm :json-file="json" v-if="edit_societe && editing" @json_value="SetJson"/>
  <EtablissementForm :json-file="json" v-if="edit_eta && editing" @edit_value="SetEta" @json_value="SetJson"></EtablissementForm>
  <RestaurantForm :json-file="json" v-if="edit_res && editing" @edit_value="SetRes"/>
  <UploadFiles v-if="ChooseFile" @upload-json="SetJson"/>
  <RemoveElements v-if="RemoveElement" :json-file="json"></RemoveElements>
  <Footer @setting_value="SetSettings"></Footer>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import SocieteForm from "@/components/SocieteForm.vue";
import EtablissementForm from "@/components/EtablissementForm.vue";
import UploadFiles from "@/components/UploadFiles.vue";
import RestaurantForm from "@/components/RestaurantForm.vue";
import download from '@/functions/Savedata'
import Footer from "@/components/footer.vue";
import RemoveElements from "@/components/RemoveElements.vue";
import TabType from "@/functions/TabType";

export default defineComponent({
  components: {RemoveElements, Footer, RestaurantForm, UploadFiles, EtablissementForm, SocieteForm},
  data() {
    return {
      setting_tab: {},
      img: require('@/assets/images/csi.png'),
      json: null,
      RemoveElement: false,
      ChooseFile: false,
      editing: false,
      edit_eta: false,
      edit_societe: false,
      edit_res: false,
      tab: {old: "", old_edit: ""},
      message: {
        'edit': 'Cliquer sur moi pour commencer à éditer le fichier.',
        'retour': 'Quitte l\'édition',
        'parcours': 'Parcourir un fichier sur le pc.',
        'save': 'Enregistrer le fichier sur votre pc.',
        'remove': 'Supprimer un élément dans le fichier'
      },

      download
    }
  },
  name: 'App',
  methods: {
    SetSettings(setting: []) {
      this.setting_tab = setting
    },
    DownloadFile() {
      download(this.json, 'arcole.json', this.setting_tab)
    },
    SetEta(value: boolean) {
      this.doEdit(false, value, 'AddEta');
      this.edit_eta = value;
    },
    SetRes(value: boolean) {
      this.doEdit(false, value, 'AddRes');
      this.edit_res = value;
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
    doEdit(must_edit: boolean, editing: boolean, id: string) {
      if (must_edit) this.editing = editing;
      if (this.json == null) return;
      const d = document.getElementById(id);
      if (d == null) return;
      // @ts-ignore
      d.disabled = editing;
    },
    DisabledButtons(str: string, tab_str: TabType, mainbutton: boolean) {
      const current = str;
      // @ts-ignore
      if (this.tab[tab_str].length === 0) {
        // @ts-ignore
          this.tab[tab_str] = current;
        // @ts-ignore
          const doc = document.getElementById(this.tab[tab_str]);
          if (doc == null) return;
          // @ts-ignore
          doc.disabled = true;
      }
      else {
        // @ts-ignore
          const doc_old = document.getElementById(this.tab[tab_str]);
        // @ts-ignore
          this.tab[tab_str] = current;
          const doc_current = document.getElementById(current);
          if (doc_old == null || doc_current == null) {
            console.error('Une erreur est survenue.')
            return;
          }
        // @ts-ignore
        doc_old.disabled = false; doc_current.disabled = true;
          if (!mainbutton) this.UpdateButtons(current);
          else this.UpdateButtonsMain(current);
      }
    },
    UpdateButtons(current: string) {
      this.edit_eta = 'AddEta' === current;
      this.edit_res = 'AddRes' === current;
      this.edit_societe = 'AddSoc' === current;
    },
    UpdateButtonsMain(current: string) {
      this.editing = 'edit' === current;
      this.ChooseFile = 'parcourir' === current;
      this.RemoveElement = 'remove' === current;
    }
  }
});
</script>