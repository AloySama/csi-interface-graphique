<template>
  <div class="app">
    <header>
      <div class="title">
        <a href="https://www.cashsystemes.eu/"><img :src="img" alt="logo CSI" title="https://www.cashsystemes.eu/"></a>
        <h1>ARCOLE<br>export</h1>
      </div>
      <div class="order">
        <button id="parcourir" :title="message['parcours']" class="hover-item"
                @click="bool.ChooseFile=true; bool.Modify = false; disabledButtons('parcourir', 'old_edit');">Charger un fichier</button>
        <button id="modify" class="hover-item" :disabled="json==null" @click="bool.Modify = true; bool.ChooseFile = false; disabledButtons('modify', 'old_edit');">Modifier éléments</button>
        <button class="hover-item" @click="DownloadFile" :disabled="json==null" :title="message['save']">Enregistrer</button>
      </div>
    </header>
  </div>
  <main-component  v-if="bool.Modify" :json-file="json"/>
  <UploadFiles v-if="bool.ChooseFile" @upload-json="SetJson"/>
  <Footer @setting_value="SetSettings"/>
</template>

<script lang="ts">
/* eslint-disable */
import {defineComponent} from "vue";
import UploadFiles from "@/components/UploadFiles.vue";
import download from '@/functions/Savedata'
import Footer from "@/components/Footer.vue";
import TabType from "@/functions/TabType";
import MainComponent from "@/components/MainComponent.vue";

export default defineComponent({
  name: 'App',
  components: {MainComponent, Footer,UploadFiles},
  data() {
    return {
      setting_tab: {},
      img: require('@/assets/images/csi.png'),
      json: null,
      bool: {
        Modify: false,
        ChooseFile: false,
        Editing: false,
      },
      tab: {old: "", old_edit: "", delete: ""},
      message: {
        'retour': 'Quitte l\'édition',
        'parcours': 'Parcourir un fichier sur le pc',
        'save': 'Enregistrer le fichier sur votre pc',
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
    disabledButtons(id: string, tab_str: TabType) {
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
        this.updateButtonsMain(current);
      }
    },
    updateButtonsMain(current: string) {
      this.bool.Editing = 'edit' === current;
      this.bool.ChooseFile = 'parcourir' === current;
    }
  }
});
</script>