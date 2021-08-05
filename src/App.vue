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
                @click="editing=true; disabledButtons('edit', 'old_edit', true);"
                :disabled="json==null">Éditer ficher ARCOLE</button>
        <button id="modify" class="hover-item" :disabled="json==null" @click="Modify = true; disabledButtons('modify', 'old_edit', true)">Modifier éléments</button>
        <button class="hover-item" @click="DownloadFile" :disabled="json==null" :title="message['save']">Enregistrer</button>
        <button id="parcourir" :title="message['parcours']" class="hover-item"
                @click="ChooseFile=true; disabledButtons('parcourir', 'old_edit', true);">Charger un fichier</button>
        <button id="remove" :title="message['remove']" class="hover-item"
                @click="RemoveElement=true; disabledButtons('remove', 'old_edit', true)"
                :disabled="json==null" >Supprimer éléments</button>
        <button id="retour" :title="message['retour']" class="hover-item" v-if="editing || ChooseFile || RemoveElement || Modify"
        @click="doEdit(true, false, 'edit');
        doEdit(false, false, 'parcourir');
        doEdit(false, false, 'remove');
        doEdit(false, false, 'modify');
        updateButtons(null)
        ChooseFile = false; RemoveElement = false">Retour</button>
      </div>
    </header>
  </div>
  <template v-if="editing">
    <button id="AddSoc" class="hover-item"
            @click="edit_societe = true; disabledButtons('AddSoc', 'old', false)
            ">Ajouter une société</button>
    <button id="AddEta" class="hover-item"
            @click="edit_eta = true; disabledButtons('AddEta', 'old', false)
            ">Ajouter un établissement</button>
    <button id="AddRes" class="hover-item" @click="edit_res = true;  disabledButtons('AddRes', 'old', false)">Ajouter une restaurant</button>
    <button v-if="edit_societe || edit_eta || edit_res" class="hover-item" @click="
                                                                updateButtons(null)
                                                                doEdit(true, false, 'AddSoc');
                                                                doEdit(true, false, 'AddRes');
                                                                doEdit(true, false, 'AddEta');
    doEdit(false, false, 'AddEta');">Retour</button></template>
  <modify-element v-if="Modify"></modify-element>
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
import ModifyElement from "@/components/ModifyElement.vue";

export default defineComponent({
  name: 'App',
  components: {ModifyElement, RemoveElements, Footer, RestaurantForm, UploadFiles, EtablissementForm, SocieteForm},
  data() {
    return {
      setting_tab: {},
      img: require('@/assets/images/csi.png'),
      json: null,
      RemoveElement: false,
      Modify: false,
      ChooseFile: false,
      editing: false,
      edit_eta: false,
      edit_societe: false,
      edit_res: false, // TODO: revoir ça aussi (peut être tout mettre directement dans un tableau)
      tab: {old: "", old_edit: "", delete: ""},
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
    doEdit(must_edit: boolean, editing: boolean, id: string) { //TODO: revoir cette fonction
      if (must_edit) this.editing = editing;
      if (id !== 'parcourir') if (this.json == null) return;
      const d = document.getElementById(id);
      if (d == null) return;
      // @ts-ignore
      d.disabled = editing;
    },
    disabledButtons(id: string, tab_str: TabType, mainbutton: boolean) {
      const current = id;
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
      this.edit_eta = 'AddEta' === current;
      this.edit_res = 'AddRes' === current;
      this.edit_societe = 'AddSoc' === current;
      this.Modify = 'modify' === current;
    },
    UpdateButtonsMain(current: string) {
      this.editing = 'edit' === current;
      this.ChooseFile = 'parcourir' === current;
      this.RemoveElement = 'remove' === current;
      this.Modify = 'modify' === current;
    }
  }
});
</script>