<template>
  <div class="app">
    <header>
      <div class="title">
        <img :src="img" alt="logo CSI">
        <h1>ARCOLE<br>export</h1>
      </div>
      <div class="order" id="buttons">
        <button id="parcourir" :title="message['parcours']" class="btn blue"
                @click="bool.ChooseFile=true; bool.Modify = false; disabledButtons('parcourir', 'old_edit');"><font-awesome-icon :icon="['fas', 'upload']" /> Charger un fichier</button>
        <button disabled id="modify" :title="message['edit']" class="btn blue" @click="bool.Modify = true; bool.ChooseFile = false; disabledButtons('modify', 'old_edit');"><font-awesome-icon :icon="['fas', 'edit']" /> Modifier éléments</button>
        <button class="btn purple" @click="DownloadFile" :disabled="json==null" :title="message['save']"><font-awesome-icon :icon="['fas', 'download']" /> Enregistrer</button>
      </div>
    </header>
  </div>
  <main-component  v-if="bool.Modify" :json-file="json"/>
  <UploadFiles v-if="bool.ChooseFile" @upload-json="SetJson"/>
  <Footer @setting_value="SetSettings">
    <template #social-media="slotProps">
      <div id="twitter"><a :href="slotProps.twitter" target="_blank"><font-awesome-icon :icon="['fab', 'twitter']" class="place-icons"/></a></div>
      <div id="facebook"><a :href="slotProps.facebook" target="_blank"><font-awesome-icon :icon="['fab', 'facebook']" class="place-icons"/></a></div>
      <div id="linkedin"><a :href="slotProps.linkedin" target="_blank"><font-awesome-icon :icon="['fab', 'linkedin']" class="place-icons"/></a></div>
    </template>
  </Footer>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import UploadFiles from "@/components/UploadFiles.vue";
import download from '@/functions/Savedata';
import Footer from "@/components/Footer.vue";
import TabType from "@/functions/TabType";
import MainComponent from "@/components/MainComponent.vue";

export default defineComponent({
  name: 'App',
  components: {MainComponent, Footer, UploadFiles},
  data() {
    return {
      setting_tab: {},
      img: require('@/assets/images/csiDL.png'),
      json: null,
      bool: {
        Modify: false,
        ChooseFile: false,
        Editing: false,
      },
      tab: {old: "", old_edit: ""},
      message: {
        'edit': 'Éditer le fichier',
        'parcours': 'Parcourir un fichier sur le pc',
        'save': 'Enregistrer le fichier sur votre pc',
      },
      download
    }
  },
  methods: {
    test() {
      alert('working')
    },
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
          this.bool.Modify = true;
          this.bool.ChooseFile = false;
          this.disabledButtons('modify', 'old_edit');
        }
        catch (error) {
          alert('Erreur sur le Json !')
          const doc = document.getElementById('modify');
          if (doc != null) {
            // @ts-ignore
            doc.disabled = true;
          }
          this.json = null;
        }
      }
      else alert("Le json est null !");
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

<style scoped>
.place-icons {
  margin-top: 8px;
  margin-left: 1px;
  font-size: 35px;
}

#twitter {
  color: #007BB5;
}

#linkedin {
  color: #007BB5;
}

#facebook {
  color: #3b5998;
}
</style>