<template>
  <div class="app">
    <header>
      <div class="title">
        <a href="https://www.cashsystemes.eu/"><img src="../../images/csi.png" alt="logo CSI"
                                                    title="https://www.cashsystemes.eu/"></a>
        <h1>ARCOLE<br>export</h1>
      </div>
      <div class="order">
        <button id="edit" :title="message['edit']" class="hover-item"
                @click="doEdit(true, true, 'edit');
                ChooseFile = false;
                doEdit(false, false, 'parcourir')">Éditer ficher ARCOLE</button>
        <button id="parcourir" :title="message['parcours']" class="hover-item"
                @click="ChooseFile = true;
                doEdit(false, true, 'parcourir');
                edit_societe = false;
                edit_eta = false;
                doEdit(true, false, 'edit')">Charger un fichier</button>
        <button id="retour" :title="message['retour']" class="hover-item" v-if="editing || ChooseFile"
                @click="doEdit(true, false, 'edit');
                doEdit(false, false, 'parcourir');
                edit_societe = false;
                edit_eta = false;
                ChooseFile = false;">Retour</button></div></header></div>
  <UploadFiles v-if="ChooseFile"/>
  <template v-if="editing">
      <button id="AddSoc" class="hover-item"
            @click="
            doEdit(false, true, 'AddSoc');
            doEdit(false, false, 'AddEta'); DisabledButtons('edit_societe')">Ajouter une société</button>
    <button id="AddEta" class="hover-item"
            @click="
            doEdit(false, true, 'AddEta');
            doEdit(false, false, 'AddSoc'); DisabledButtons('edit_eta')">Ajouter un établissement</button>
    <button id="AddRes" class="hover-item" @click="edit_res = true; doEdit(false, true, 'AddRes'); DisabledButtons('edit_res')">Ajouter une restaurant</button>
    <button v-if="edit_societe || edit_eta || edit_res" class="hover-item" @click="edit_societe = false;
                                                                edit_eta = false;
                                                                edit_res = false;
                                                                doEdit(false, false, 'AddSoc');
                                                                doEdit(false, false, 'AddRes');
                                                                doEdit(false, false, 'AddEta');">Retour</button></template>
  <SocieteForm v-if="edit_societe"/>
  <EtablissementForm v-if="edit_eta" @edit_value="SetEta"></EtablissementForm>
  <RestaurantForm v-if="edit_res" @edit_value="SetRes"/>
  <div class="left">{{ date }}</div>
  <footer> <a href="https://www.linkedin.com/in/alo%C3%AFs-brengard/" target="_blank">Author: Aloïs BRENGARD</a></footer>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ParseSociete from "@/functions/ParseSociete";
import ParseRestaurant from "@/functions/ParseRestaurant";
import EditSociete from "@/functions/edit_json";
import SocieteForm from "@/components/SocieteForm.vue";
import EtablissementForm from "@/components/EtablissementForm.vue";
import UploadFiles from "@/components/UploadFiles.vue";
import RestaurantForm from "@/components/RestaurantForm.vue";
import Terms from "@/functions/Terms";
export default defineComponent({
  components: {RestaurantForm, UploadFiles, EtablissementForm, SocieteForm},
  data() {
    return {
      json: require('../../json_file/test_file.json'),
      ChooseFile: false,
      edit_eta: false,
      edit_societe: false,
      edit_res: false,
      editing: false,
      message: {
        'edit': 'Cliquer sur moi pour commencer à éditer le fichier.',
        'retour': 'Sauvegarde et quitte l\'édition',
        'parcours': 'Parcourir un fichier sur le pc.'
      },
      date: 'Vous avez affiché cette page le ' + new Date().toLocaleString(),
      EditSociete,
      ParseSociete,
      ParseRestaurant
    }
  },
  name: 'App',
  methods: {
    doEdit(must_edit: boolean, editing: boolean, id: string) {
      if (must_edit)
        this.editing = editing;
      const d = document.getElementById(id);
      if (d == null)
        return;
      // @ts-ignore
      d.disabled = editing;
    },
    SetEta(value: boolean) {
      this.edit_eta = value;
    },
    SetRes(value: boolean) {
      this.edit_res = value;
    },
    DisabledButtons(str: Terms) {
      const List = {'edit_eta': 'AddEta', 'edit_societe': 'AddSoc', 'edit_res': 'AddRes'};
      let count = 0;
      for (const T in List) {
        if (str === T) {
          console.log(str + ': ' + List[T]);
          // @ts-ignore
          document.getElementById(List[T]).disabled = true;
          if (count === 0) {
            this.edit_eta = true;
            this.edit_res = false;
            this.edit_societe = false
          }
          else if (count === 1) {
            this.edit_eta = false;
            this.edit_res = false;
            this.edit_societe = true;
          }
          else {
            this.edit_res = true;
            this.edit_societe = false;
            this.edit_eta = false;
          }
          continue;
        }
        // @ts-ignore
        document.getElementById(List[T]).disabled = false;
        count++;
      }
    }
  }
});
</script>

<style scoped>
.left {
  position: absolute;
  bottom: 0;
  left: 10px;
  font-size: 12px;
}
</style>
<!--TODO: revoir la fonction DisabledButton en vue de l'améliorer -->